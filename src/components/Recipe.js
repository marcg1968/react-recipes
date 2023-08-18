// Recipe.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
// import { sleep } from '../common/functions'
import {
    Header3,
    IngredientRow,
    IngredientContainer,
    MethodContainer,
    FactorInput,
    FactorText,
    FactorSection,
    MetaDiv,
    ULSources,
    LISources,
} from './Builders'
import { RecipeContext } from '../App'
import {
    dbGetRecipe,
    rndStr,
} from '../common/functions'

export const Recipe = props => {

    const params = useParams()
    const { id } = params || {}

    const [ loaded,   setLoaded ]   = useState(false)
    const [ recipe,   setRecipe ]   = useState({})
    const [ recipeId, setRecipeId ] = useState(id)
    const [ factor,   setFactor ]   = useState(null)

    const [
        recipeTitles,
        ,
        factorBtn,
        ,
    ] = useContext(RecipeContext)

    const { state } = useLocation()
    const linkedid = state?.linkedid
    const noprevnext = state?.noprevnext

    /* if a prev or next <Link/> has been clicked, update the recipeId state var */
    useEffect(() => {
        if (linkedid) setRecipeId(linkedid)
    }, [linkedid])

    const getRecipe = useCallback(async () => {
        if (!recipeId) return
        // await sleep(3000)
        const result = await dbGetRecipe(recipeId)
        setRecipe(result instanceof Array ? result[0] : result)
        setLoaded(true)
    }, [recipeId])

    useEffect(() => {
        getRecipe()
    }, [getRecipe]) /* NB dependency must be the const function */

    const {
        title,
        meta,
        parts,
    } = recipe || {}
    
    if (parts && parts instanceof Array) parts[0].title = null // remove "__MAIN__"
    const metadata = meta instanceof Array 
        ? meta.reduce((acc, curr) => {
            acc[curr[0]] = curr[1]
            return acc
        }, {}) 
        : {}
    const { lang } = metadata || {}

    const PrevOrNextLink = ({ type = 'next' }) => {

        if (    !recipeTitles
            ||  !Array.isArray(recipeTitles)
            ||  !recipeTitles.length
            ||  !id
            ||  noprevnext
        ) return null

        // find position in list
        const idx = recipeTitles.findIndex(e => e._id === id)
        const nextRecipe = (idx + 1 < recipeTitles.length) ? recipeTitles[(idx + 1)] : null
        const prevRecipe = (idx > 0) ? recipeTitles[(idx - 1)] : null
        if (type === 'next' && !nextRecipe) return null
        if (type === 'prev' && !prevRecipe) return null

        return type === 'prev'
            ? ( <Link
                    title={prevRecipe.title}
                    className='prevnextlink'
                    to={`/recipe/${prevRecipe._id}`}
                    state={{ linkedid: prevRecipe._id }}
                    onClick={() => setLoaded(false)}
                >&lt;&lt;&nbsp;&nbsp;</Link>
            )
            : ( <Link
                    title={nextRecipe.title}
                    className='prevnextlink'
                    to={`/recipe/${nextRecipe._id}`}
                    state={{ linkedid: nextRecipe._id }}
                    onClick={() => setLoaded(false)}
                >&nbsp;&nbsp;&gt;&gt;</Link>
            )
    }

    const changeHandler = evt => {
        let n = evt.target.value.trim()
        if (n === '') return setFactor(null)
        if (typeof n === 'string' && n.match(/^(\d+|\d+[\s/\d]+\d+)$/)) {
            n = n.split(/\s+/)
                .map(e => e.match(/^[\d/]+$/) ? eval(e): e)
                .reduce((acc, curr) => acc + curr)
            return setFactor(n)
        }
        setFactor(null)
    }

    const clickHandler = evt => {
        if (factor === null) return

    }

    return (
        <div>
            {
                loaded && parts instanceof Array
                    ? (
                        <>
                            <h1>
                                <PrevOrNextLink type='prev' />
                                {title}&nbsp;{lang && lang === 'de' ? '(in German)' : ''}
                                <PrevOrNextLink type='next' />
                            </h1>

                            {
                                recipe && 'meta' in recipe
                                    ? <Meta meta={recipe['meta']}/>
                                    : null
                            }

                            {
                                factorBtn
                                ? (
                                    <FactorSection>
                                        <FactorText>Change the recipe amounts by a certain factor (e.g. 2/3): </FactorText>
                                        <FactorInput
                                            type='text'
                                            maxLength='9'
                                            size='9'
                                            autoFocus={true}
                                            autocomplete="off"
                                            autocorrect="off"
                                            autocapitalize="off"
                                            spellcheck={false}
                                            onChange={changeHandler}
                                            onBlur={clickHandler}
                                        />
                                    </FactorSection>
                                )
                                : null
                            }
                            {
                                parts.map((e, i) => <Part key={`part-${i}`} { ...parts[i] } n={i} factor={factor} />) 
                            }
                            {/* <pre>{JSON.stringify(recipeTitles, null, 2)}</pre> */}
                        </>
                    )
                    : <p>loading ...</p>
            }

            {/* <pre>{recipe ? JSON.stringify(recipe, null, 2) : null}</pre> */}
            
        </div>
    )
}

const Part = ({ title = null, ingreds = null, method = null, n = 0, factor = null }) => {

    const amtsAsDecimal = ingreds.map(({ qty: { amt=0 } }, i) => {
        if (typeof amt === 'number') return amt
        if (typeof amt === 'string') {
            return amt
                .trim()
                .split(/\s+/)
                .map(e => e.match(/^[\d/]+$/) ? eval(e): e)
                .reduce((acc, curr) => acc + curr)
        }
        return 0
    })

    return (
        <>
            {
                ingreds
                    ? (
                        <IngredientContainer>
                            {   title && <Header3>{title}</Header3> }
                            {
                                ingreds.map(({ name='', qty: { amt='', unit='' } }, i) => {
                                    unit = unit === 'x' ? '' : `${unit}\u00A0`
                                    amt = factor && typeof amtsAsDecimal[i] !== 'undefined'
                                        ? (amtsAsDecimal[i] * factor) > 100
                                            ? Math.round(amtsAsDecimal[i] * factor)
                                            : Math.round((amtsAsDecimal[i] * factor)*100)/100
                                        : amt
                                    return (
                                        <IngredientRow
                                            key={`ingred-${n}-${i}`}
                                        >
                                            <div className='ingred-col-1 text-right print-text-right'>{amt}&nbsp;{unit}</div>
                                            <div className='ingred-col-3 print-text-left'>{name}</div>
                                        </IngredientRow>
                                    )
                                })
                            }
                        </IngredientContainer>
                    )
                    : null
            }
            {
                method
                    ? (
                        <MethodContainer>
                        {
                            method.map((e, i) => (
                                <li key={`meth-${n}-${i}`}>{e}</li>
                            ))
                        }
                        </MethodContainer>
                    )
                    : null
            }
        </>
    )
}

const Meta = ({ meta = [] }) => {

    console.log(232, {meta})
    const srcArr    = meta.filter(e => e[0]==='src')  .map(e => e[1])
    const infoArr   = meta.filter(e => e[0]==='info') .map(e => e[1])
    const categArr  = meta.filter(e => e[0]==='categ').map(e => e[1])

    const outputArr = arr => arr.map((e, i) => <h3 key={`${rndStr()}-${i}`}>{e}</h3>)

    return (
        <MetaDiv>
            {/* <pre>{srcArr.length     ? JSON.stringify(srcArr,    null, 2) : null}</pre>
            <pre>{infoArr.length    ? JSON.stringify(infoArr,   null, 2) : null}</pre>
            <pre>{categArr.length   ? JSON.stringify(categArr,  null, 2) : null}</pre>
            {srcArr.length     ? outputArr(srcArr)      : null}
            {infoArr.length    ? outputArr(infoArr)     : null}
            {categArr.length   ? outputArr(categArr)    : null} */}
            {
                infoArr.length
                    ? (
                        infoArr.map((e, i) => <div key={`infop-${i+1}`}>{e}</div>)
                    )
                    : null
            }
            {
                srcArr.length === 0
                    ? null
                    : srcArr.length === 1
                        ? <code>Source: {srcArr[0]}</code>
                        : (
                            <>
                                <code>Sources:</code>
                                <ULSources>
                                    {srcArr.map((e, i) => <LISources key={`srcs-${i+1}`}>{e}</LISources>)}
                                </ULSources>
                            </>
                        ) 
            }
        </MetaDiv>
    )
}
