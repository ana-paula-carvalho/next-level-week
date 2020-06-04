function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res=>res.json())
    .then(states=>{
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    var valorUF = event.target.value
    
    stateInput.value=event.target.options[event.target.selectedIndex].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valorUF}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res=>res.json())
    .then(cities=>{
        for (const city of cities) {
            citySelect.innerHTML += `<option values="${city.id}">${city.nome}</option>`
        }
    })
    citySelect.disabled = false
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities) 


/*Itens de coleta*/
const itemsToColllect = document.querySelectorAll(".items-grid li")
for (const item of itemsToColllect) {
    item.addEventListener("click", handleSelectedItem)
}

//pega campo escondido
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")//adiciona ou remove classe

    const itemId = itemLi.dataset.id

    const jaFoiSelecionado = selectedItems.findIndex(item=>item==itemId/*função retorna true ou false*/)
    
    if(jaFoiSelecionado>=0){
        //tirara seleção
        const filteredItems = selectedItems.filter(item=>item!=itemId)
        selectedItems = filteredItems
    }else{
        //se não tiver selecionado adicionar
        selectedItems.push(itemId);
    }    
    //adicionar no campo escondido o item selecionado
    collectedItems.value = selectedItems
}