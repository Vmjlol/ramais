function colorir(color) {

    if (color == "prefeitura") {
        color = "#242553";
    } else if (color == "saude") {
        color = "#532424"; 
    } else if (color == "educacao") {
        color = "#505324";
    } else if (color == "social") {    
        color = "#53244f";  
    } else if (color == "serpub") {
        color = "#2a5324";
    }
    else {
        color = "#626060";
    }

    document.getElementById("textHeader").style.backgroundColor = color;

    let thTable = document.getElementsByTagName("th");
    for (var i = 0; i < thTable.length; i++) {
        thTable[i].style.backgroundColor = color;
    }
}


let carregar = (filtro) => {
    fetch(`https://raw.githubusercontent.com/Vmjlol/api-telefones/main/api.json`)
        .then((response) => response.json())
        .then((data) => {
            let newHTML = ``
            for (let i = 0; i < data.length; i++) {
                let dados = data[i];

                if (filtro == 'prefeitura') {
                    document.getElementById('legenda').innerHTML = 'Prefeitura';
                    if (dados.tag == "p1" || dados.tag == "p2") {
                        newHTML += `
                        <tr class="${dados.tag}">
                            <td>${dados.ramal}</td>
                            <td>${dados.localizacao}</td>
                            <td>${dados.nome}</td>
                        </tr>
                        `
                    }
                } else if (filtro == 'saude') {
                    document.getElementById('legenda').innerHTML = 'Saúde';
                    if (dados.ramal >= 200 && dados.ramal <= 299) {
                        newHTML += `
                        <tr class="${dados.tag}">
                            <td>${dados.ramal}</td>
                            <td>${dados.localizacao}</td>
                            <td>${dados.nome}</td>
                        </tr>
                        `
                    }
                } else if (filtro == 'educacao') {
                    document.getElementById('legenda').innerHTML = 'Educação';
                    if (dados.ramal >= 300 && dados.ramal <= 399) {
                        newHTML += `
                        <tr class="${dados.tag}">
                            <td>${dados.ramal}</td>
                            <td>${dados.localizacao}</td>
                            <td>${dados.nome}</td>
                        </tr>
                        `
                    }
                } else if (filtro == 'social') {
                    document.getElementById('legenda').innerHTML = 'Assistência Social';
                    if (dados.ramal >= 500 && dados.ramal <= 599) {
                        newHTML += `
                        <tr class="${dados.tag}">
                            <td>${dados.ramal}</td>
                            <td>${dados.localizacao}</td>
                            <td>${dados.nome}</td>
                        </tr>
                        `
                    }
                } else if (filtro == 'serpub') {

                    if (dados.ramal >= 600 && dados.ramal <= 799) {
                        document.getElementById('legenda').innerHTML = 'Serviços Públicos, Esporte e Previdência';
                        newHTML += `
                        <tr class="${dados.tag}">
                            <td>${dados.ramal}</td>
                            <td>${dados.localizacao}</td>
                            <td>${dados.nome}</td>
                        </tr>
                        `
                    }
                } else {
                    document.getElementById('legenda').innerHTML = 'Geral';
                    newHTML += `
                    <tr class="${dados.tag}">
                        <td>${dados.ramal}</td>
                        <td>${dados.localizacao}</td>
                        <td>${dados.nome}</td>
                    </tr>
                    `
                }    

            }
            document.getElementById('tbody').innerHTML = newHTML;
        });
}


