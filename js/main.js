'use strict'

const submitButton = document.querySelector('.form-submit__button')
const nameInput = document.getElementById('form-text__name')
const secnameInput = document.getElementById('form-text__secname')
const ageInput = document.getElementById('form-text__age')
const childInput = document.getElementById('form-text__child')
const selectInput = document.querySelector('select')
const orgInput = document.getElementById('form-text__org')
const rankInput= document.getElementById('form-text__rank')
const dateInput = document.getElementById('form-text__date')
const table = document.querySelector('table')
const trOld = document.querySelector('.output-string-clone')

let dateDeletes = document.querySelectorAll('.delete-button')
let dataItems = []

let dataI = {
    name:  '',
    secName: '',
    age: 0,
    child: false,
    select: '',
    org: '',
    rank: 0,
    date: ''
}
const startFunc = function () {
    fromLocalStorageFunc()
    render() 
}

const dataBring = function () {
    dataI.name = nameInput.value
    dataI.secName = secnameInput.value
    dataI.age = ageInput.value
    dataI.child = childInput.value
    dataI.select = selectInput.value
    dataI.org = orgInput.value
    dataI.rank = rankInput.value
    dataI.date = dateInput.value

    nameInput.value = ""
    secnameInput.value =""
    ageInput.value = ""
    childInput.value = ""
    selectInput.value = ""
    orgInput.value = ""
    rankInput.value = ""
    dateInput.value = ""

    dataItems.push(dataI)

    if (dataItems.length >= 1) {
        localStorage.setItem("dataItems", JSON.stringify(dataItems))
    }
    console.log(localStorage.dataItems);
    render()
}

const fromLocalStorageFunc = function () {
    dataItems = JSON.parse(localStorage.getItem("dataItems")) || []
}
const render = function () {
    fromLocalStorageFunc()
    table.innerHTML = `<tr class="output-string">
        <td class="output-block output-block__title">Имя</td>
        <td class="output-block output-block__title">Фамилия</td>
        <td class="output-block output-block__title">Возраст</td>
        <td class="output-block output-block__title">Наличие детей</td>
        <td class="output-block output-block__title">Должность</td>
        <td class="output-block output-block__title">Разряд</td>
        <td class="output-block output-block__title">Дата принятия на работу</td>
        <td class="output-block output-block__title"></td>
    </tr>
    <!-- /.output-string -->
    <tr class="output-string output-string-clone dNone">
        <td class="output-block output-block__zero output-block__name"></td>
        <td class="output-block output-block__zero output-block__secname"></td>
        <td class="output-block output-block__zero output-block__age"></td>
        <td class="output-block output-block__zero output-block__child"></td>
        <td class="output-block output-block__zero output-block__role"></td>
        <td class="output-block output-block__zero output-block__rank"></td>
        <td class="output-block output-block__zero output-block__date"></td>
        <td class="output-block output-block__zero output-block-button "><button class="output-block__button delete-button">Удалить</button></td>
    </tr>`
    dataItems.forEach(dataI => {
        const newTr = trOld.cloneNode(true)
        newTr.classList.remove('dNone')
    
        const tdName = newTr.querySelector('.output-block__name')
        const tdsecName = newTr.querySelector('.output-block__secname')
        const tdAge = newTr.querySelector('.output-block__age')
        const tdChild = newTr.querySelector('.output-block__child')
        const tdRole = newTr.querySelector('.output-block__role')
        const tdRank = newTr.querySelector('.output-block__rank')
        const tdDate = newTr.querySelector('.output-block__date')
        
        tdName.textContent = dataI.name
        tdsecName.textContent = dataI.secName
        tdAge.textContent = dataI.age
        if (childInput.checked) {
            tdChild.textContent = 'Есть'
        } else {
            tdChild.textContent = 'Нет'
        }
        tdRole.textContent = dataI.select
        tdRank.textContent = dataI.rank
        tdDate.textContent = dataI.date
    
        table.append(newTr)
    })

    dateDeletes = document.querySelectorAll('.delete-button')

    dateDeletes.forEach((dataDelete, index) => {
        dataDelete.addEventListener("click", function () {
            dataItems.splice(index-1, 1)
            localStorage.setItem("dataItems", JSON.stringify(dataItems))
            if (dataItems.length === 0) {
              localStorage.clear()
            }
            render()
          })
    })
}



submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    dataBring()
})

startFunc()

