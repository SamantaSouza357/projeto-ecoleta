

function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += ` <option value="${state.id}">${state.nome}</option>`
            }
        })
}
populateUF()


function getCity(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true;


    fetch(url)
        .then(res => res.json())
        .then(citys => {
            for (const city of citys) {
                citySelect.innerHTML += ` <option value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false;

        })
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCity)


const itemsColeta = document.querySelectorAll(".itens-grid li")

for (item of itemsColeta) {
    item.addEventListener("click", handleSelectedItem)
}


 const colectItem = document.querySelector("input[name=items]")

let selectedItems = []
function handleSelectedItem(event) {

    const itemLi = event.target

    itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id


  const alreadySelelected = selectedItems.findIndex(item=> {
      const itemFound = item == itemId
      return itemFound
  })

  if(alreadySelelected  >= 0){
      const filteredItems = selectedItems.filter(item => {
          const itemDiferente = item != itemId
          return itemDiferente
      })
      selectedItems = filteredItems

  }else{
    selectedItems.push(itemId)
  }

  colectItem.value = selectedItems
  console.log(selectedItems);
}