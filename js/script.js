// IMC DATA
const data = [
    {
      min: 1,
      max: 16,
      classification: "Menor que 16",
      info: "Magreza grave",
      obesity: "0",
      clas: "extremely-bad",
    },
    {
      min: 16,
      max: 16.9,
      classification: "Entre 16 e 16,9",
      info: "Magreza moderada",
      obesity: "0",
      clas: "bad",
    },
    {
      min: 17,
      max: 18.4,
      classification: "Entre 17 e 18,4",
      info: "Magreza",
      obesity: "0",
      clas: "attention",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
      clas: "good",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
      clas: "attention",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
      clas: "bad",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
      clas: "extremely-bad",
    },
  ];

  //Selecionando elementos

  const h2Title = document.querySelector('#h2InitialTitle')
  const form = document.querySelector('#form')

  const alturaInput = document.querySelector('#altura')
  const pesoInput = document.querySelector('#peso')

  const calcularBtn = document.querySelector('#calc-btn')
  const limparBtn = document.querySelector('#clean-btn')

  const resultsDiv = document.querySelector('#results')
  const imcTable = document.querySelector('.imc-table')

  const imcValueSpan = document.querySelector('#imc-value-span')
  const imcInfoSpan = document.querySelector('#imc-info-span')
  const backBtn = document.querySelector('#back-btn')

  //Funções
  function createTable(data){

    data.forEach(item => {
    const div = document.createElement('div')
    div.classList.add('IMC-data')
    div.classList.add('dp-flex')

    const classification = document.createElement('p')
    classification.innerHTML = item.classification

    const info = document.createElement('p')
    info.innerHTML = item.info

    const obesity = document.createElement('p')
    obesity.innerHTML = item.obesity

    div.appendChild(classification)
    div.appendChild(info)
    div.appendChild(obesity)

    imcTable.appendChild(div)
    });
  }
  
  function validDigits(text){
    return text.replace(/[^0-9,]/g,"")
  }
  function clear(){
    alturaInput.value = ''
    pesoInput.value = ''
  }
  function converterToNumber(alturaStringValue, pesoStringValue){
    const alturaNumber = +alturaStringValue.replace(',','.')
    const pesoNumber = +pesoStringValue.replace(',','.')
    return [alturaNumber, pesoNumber]
  }
  function validator(temAltura, temPeso){
    if(!temAltura || !temPeso) return alert("Preencha todos os campos")
  }
  function calcIMC(array){
    const altura = array[0]
    const peso = array[1]

    return (peso / (altura * altura)).toFixed(1)
  }
  function showResults(imcValue, imcInfo){

    imcValueSpan.innerHTML = imcValue
    imcInfoSpan.innerHTML = imcInfo
    let clas

    data.forEach((item) => {
      if(imcValue >= item.min && imcValue <= item.max){
        clas = item.clas
        imcValueSpan.classList.add(clas)
        imcInfoSpan.classList.add(clas)
      }
    })

    h2Title.classList.add('hide')
    form.classList.add('hide')
    resultsDiv.classList.remove('hide')
    
  }

  //Inicialização
  createTable(data)

  //Eventos

  const numericInputFields = document.querySelectorAll('#altura, #peso');

    for (const inputField of numericInputFields) {
    inputField.addEventListener('input', (e) => {
        const updateValue = validDigits(e.target.value);
        e.target.value = updateValue;
    });
    }


  calcularBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const alturaValue = alturaInput.value;
    const pesoValue = pesoInput.value;

    validator(alturaValue, pesoValue)

    const alturaPeso = converterToNumber(alturaValue,pesoValue)
    const imcValue = calcIMC(alturaPeso)

    let info

    data.forEach((item) => {
      if(imcValue >= item.min && imcValue <= item.max){
        info = item.info
      }
    })
    
    if(!info) return;
    
    showResults(imcValue,info)
  })

  limparBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    clear()
  })

  backBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clear()
    h2Title.classList.remove('hide')
    form.classList.remove('hide')
    resultsDiv.classList.add('hide')
    imcValueSpan.classList = ''
    imcInfoSpan.classList = ''

  } )

