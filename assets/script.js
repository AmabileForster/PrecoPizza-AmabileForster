document.addEventListener("DOMContentLoaded", function(){
    //Pegar elementos do HTML
    const reportTable = document.querySelector("#report tbody");
    const pizzaForm = document.getElementById("pizzaForm");

    //Array de informações da pizza
    const pizzas = [];

    //Evento de formulario
    pizzaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        //Obter valores do formulário
        const price = parseFloat(document.getElementById("pizzaPrice").value);
        const size = parseInt(document.getElementById("pizzaSize").value);
        const name = document.getElementById("pizzaName").value;

        //Valida os valores inseridos
        if (isPizzaValid(name, size, price)) {
            const area = calculateArea(size);
            const priceArea = price / area;

            pizzas.push({name, size, price, priceArea});
            updateReport();
        } else {
            alert("Preencha todos os campos corretamente!");
        }

        pizzaForm.reset();
    });

    //Verifica se os valores da pizza são válidos
    function isPizzaValid(name, size, price) {
        return name && size > 0 && price > 0 && !pizzas.find(pizza => pizza.size === size);
    }

    //Calcula a área da pizza com base no tamanho (raio)
    function calculateArea(size) {
        const radius = size / 2;
        return Math.PI * Math.pow(radius, 2);
    }

    //Atualiza a tabela de relatório com informações
    function updateReport() {
        pizzas.sort((a, b) => a.priceArea - b.priceArea);
        reportTable.innerHTML = "";

        //criar linha para cada pizza inserida
        pizzas.forEach((pizza, i) => {
            const row = reportTable.insertRow();
            row.innerHTML = `
                <td>${pizza.name}</td>
                <td>${pizza.size}</td>
                <td>R$${pizza.price.toFixed(2)}</td>
                <td>R$${pizza.priceArea.toFixed(2)}</td>
                <td>${i === 0 ? "Melhor Custo Beneficio" : `+${((pizza.priceArea - pizzas[0].priceArea) / pizzas[0].priceArea * 100).toFixed(0)}%`}</td>
            `
        })
    }
})