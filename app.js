        const h2 = document.querySelector('h2'),
              img =  document.querySelector('img'),
              h3 = document.querySelector('h3'),
              usList = document.querySelector(`#in-list`),
              randomDrink = document.querySelector(`p`),
              randomBtn = document.querySelector('button'),
              movedBtnDiv = document.querySelector('div#btn'),
              origBtnDiv = document.querySelector('div#btn-orig')
        let input = document.querySelector('input')

input.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        if(isEmpty(input.value)){
            input.value = ''
            input.placeholder = ' Che cocktail classico vuoi preparare?'
            setError(`Inserisci il nome di un cocktail!`)
            }else{
            fetchInfo(input.value)
            }
    }   
})

randomBtn.addEventListener('click', randomDrinkSelector)

    function fetchInfo(drink){
        clear()
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res=> res.json()) 
    .then(data=>{
        if(Array.isArray(data.drinks)){
            styleUp(data)
        }else{
            setError(`Cocktail non trovato. Riprova!`)
        }
    })
    .catch(err=>{
        setError(`Cocktail non trovato. Riprova!`)
    })
    }

    function styleUp(data){
        h2.className = 'des'
        img.className = 'des'
        h3.className = 'des'
        usList.className = 'des'
        movedBtnDiv.appendChild(randomBtn)
console.log(data)
        h2.innerText = data.drinks[0].strDrink
        img.src = data.drinks[0].strDrinkThumb
        h3.innerText = data.drinks[0].strInstructionsIT
        for(const key in data.drinks[0]){
            for(let i=0;i<=15;i++){
                if(key === `strIngredient${i.toString()}` && data.drinks[0][key] !== null){
                    let measurement = data.drinks[0][`strMeasure${i}`]
                const li = document.createElement('li')
                 li.innerText = `${data.drinks[0][key]} - ${measurement}`
                 usList.appendChild(li)
                }
            }
        }
    }

    function clear(){
        h2.innerText = ''
        img.src =  ''
        h3.innerText = ''
        usList.innerHTML = ''

        h2.className = ''
        img.className = ''
        h3.className = ''
        usList.className = ''

        movedBtnDiv.innerHTML = ''
        origBtnDiv.appendChild(randomBtn)
    }

    function setError(msg){
        clear()
        let alerter = document.createElement('h1')
        alerter.className = 'des-alert'
        alerter.appendChild(document.createTextNode(msg))
        document.querySelector('#alert').appendChild(alerter)
        setTimeout(clearWarning,3000)
    }

    function randomDrinkSelector(){
        clear()
        input.value = ''
        input.placeholder = ' Che cocktail classico vuoi preparare?'
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res=> res.json()) 
    .then(data=>{
            styleUp(data)
    })
    .catch(err=>{
        setError()
    })
    }

   const isEmpty = (str) => !str.trim().length

   const clearWarning = () => document.querySelector('#alert').innerHTML = ''

