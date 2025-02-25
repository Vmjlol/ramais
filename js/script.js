async function fetchDataGeral() {
    const response = await fetch("https://raw.githubusercontent.com/Vmjlol/api-telefones/refs/heads/main/api.json");
    const data = await response.json();

    const ranges = {
        "101-199": [], "201-299": [], "301-399": [],
        "401-499": [], "501-599": [], "601-699": [], "701-799": []
    };

    const headers = {
        "101-199": { prefix: "100", localizacao: "Prefeitura" },
        "201-299": { prefix: "200", localizacao: "Saúde" },
        "301-399": { prefix: "300", localizacao: "Educação" },
        "401-499": { prefix: "400", localizacao: "Fazenda" },
        "501-599": { prefix: "500", localizacao: "Social" },
        "601-699": { prefix: "600", localizacao: "Serv. Públicos" },
        "701-799": { prefix: "700", localizacao: "Esporte/Prev." }
    };

    data.forEach(item => {
        const ramalNum = parseInt(item.ramal, 10);
        for (const range in ranges) {
            const [min, max] = range.split("-").map(Number);
            if (ramalNum >= min && ramalNum <= max) {
                ranges[range].push(item);
            }
        }
    });

    document.fonts.ready.then(() => {
        drawImageWithDataGeral(ranges, headers);
    });
}

function drawHeaderGeral(ctx, canvasWidth) {
    canvasWidth = 3840;
    canvasHeight = 2160;

    const headerHeight = 400;
    const img = new Image();
    img.src = "img/telefone.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, headerHeight);
        
        ctx.fillStyle = "#45464d"; 
        ctx.beginPath();
        ctx.roundRect(100, 120, 795, 150, 30);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.font = "70px Montserrat";
        ctx.fillText("Lista de Ramais", 220, 200);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Montserrat";
        ctx.fillText("Geral", 660, 250);
    };
}

function drawFooterGeral(ctx, canvasWidth, canvasHeight) {
    const footerHeight = 300;
    const rectWidth = 1200;
    const rectHeight = 150;
    const rectX = canvasWidth - rectWidth - 30;
    const rectY = canvasHeight - footerHeight + 20;

    ctx.fillStyle = "#9c9696";
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Montserrat";
    const textX = rectX + 30;
    const textY = rectY + 90;
    ctx.fillText("terraboa.pr.gov.br | 0800-115-7700 | 3641-8000", textX, textY);
}

function drawImageWithDataGeral(ranges, headers) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colWidth = 350;
    const padding = 120;
    const startX = 100;
    const lineHeight = 25;

    let maxRows = 0;
    for (const faixa in ranges) {
        maxRows = Math.max(maxRows, ranges[faixa].length);
    }

    const headerHeight = 200;
    const canvasHeight = headerHeight + (maxRows + 5) * lineHeight + 50;

    canvas.width = colWidth * Object.keys(ranges).length + padding * (Object.keys(ranges).length + .7);
    canvas.height = canvasHeight;

    drawHeaderGeral(ctx, canvas.width);

    ctx.fillStyle = "#f0ecec";
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    let x = startX;
    let yStart = headerHeight + 250; //

    for (const [range, funcionarios] of Object.entries(ranges)) {
        let y = yStart;

        if (ctx.fillStyle = ["101-199", "401-499"].includes(range)) { 
                ctx.fillStyle = "#242553";
        }   else if (ctx.fillStyle = ["201-299"].includes(range)) {
                ctx.fillStyle = "#532424";
        }   else if (ctx.fillStyle = ["301-399"].includes(range)) {
                ctx.fillStyle = "#505324";
        }   else if (ctx.fillStyle = ["501-599"].includes(range)) {
                ctx.fillStyle = "#53244f";
        }   else if (ctx.fillStyle = ["601-699", "701-799"].includes(range)) {
                ctx.fillStyle = "#2a5324";
        }

        ctx.fillRect(x, y - 20, colWidth, 25);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Montserrat";

        const { prefix, localizacao } = headers[range];
        const ramalWidth = ctx.measureText("999").width + 10;
        const localWidth = ctx.measureText("Serv. Públicos").width + 20;
        const nomeWidth = colWidth - (ramalWidth + localWidth + 30);

        ctx.fillText(prefix, x, y);
        ctx.fillText(localizacao, x + ramalWidth, y);
        ctx.fillText("Nome", x + ramalWidth + localWidth, y);

        y += 20;
        ctx.font = "14px Montserrat";

        funcionarios.forEach(func => {
            ctx.fillStyle = ["p1", "s1", "e1", "soc1", "pub1"].includes(func.tag) ? "#e5e5df" : "#fafafa";
            ctx.fillRect(x, y - 15, colWidth, 20);

            ctx.fillStyle = func.tag === "p1" ? "#041629" : "#000000";
            ctx.fillText(func.ramal, x, y);
            ctx.fillText(func.localizacao, x + ramalWidth, y);
            ctx.fillText(func.nome, x + ramalWidth + localWidth, y);
            y += 20;

            
            
            if (ctx.fillStyle = ["101-199", "401-499"].includes(range)) { 
                ctx.fillStyle = "#242553";
        }   else if (ctx.fillStyle = ["201-299"].includes(range)) {
                ctx.fillStyle = "#532424";
        }   else if (ctx.fillStyle = ["301-399"].includes(range)) {
                ctx.fillStyle = "#505324";
        }   else if (ctx.fillStyle = ["501-599"].includes(range)) {
                ctx.fillStyle = "#53244f";
        }   else if (ctx.fillStyle = ["601-699", "701-799"].includes(range)) {
                ctx.fillStyle = "#2a5324";
        }

            ctx.fillRect(x, y - 15, colWidth, 20);
        });

        x += colWidth + padding;
    }

    drawFooterGeral(ctx, canvas.width, canvas.height);

}

async function fetchDataPrefeitura() {
    const response = await fetch("https://raw.githubusercontent.com/Vmjlol/api-telefones/refs/heads/main/api.json");
    const data = await response.json();

    const filteredData = data.filter(item => {
        const ramalNum = parseInt(item.ramal, 10);
        return ramalNum >= 101 && ramalNum <= 799 && (item.tag == "p1" || item.tag == "p2");
    });

    const ranges = {
        "101-799": filteredData,
    };

    const headers = {
        "101-799": { prefix: "#", localizacao: "Localização" },
    };

    document.fonts.ready.then(() => {
        drawImageWithDataPrefeitura(ranges, headers);
    });
}

function drawHeaderPrefeitura(ctx, canvasWidth) {
    const headerHeight = 300;
    const img = new Image();
    img.src = "img/telefone2.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, headerHeight);
        
        ctx.fillStyle = "#242553"; 
        ctx.beginPath();
        ctx.roundRect(100, 75, 795, 150, 30);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.font = "70px Montserrat";
        ctx.fillText("Lista de Ramais", 220, 175);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Montserrat";
        ctx.fillText("Prefeitura", 640, 210);
    };
}

function drawFooterPrefeitura(ctx, canvasWidth, canvasHeight) {
    const footerHeight = 150;
    const rectWidth = 1500;
    const rectHeight = 140;
    const rectX = canvasWidth - rectWidth - 100;
    const rectY = canvasHeight - footerHeight - 80;

    ctx.fillStyle = "#242553";
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Montserrat";
    ctx.fillText("terraboa.pr.gov.br | 0800-115-7700 | (44) 3641-8000", rectX * 1.2, rectY + 90);
}

function drawImageWithDataPrefeitura(ranges, headers) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colWidth = 2160;
    const startX = 100;
    const lineHeight = 25;

    const filteredData = ranges["101-799"];
    let maxRows = filteredData.length;

    const headerHeight = 200;
    const canvasHeight = headerHeight + (maxRows + 5) * lineHeight + 50;

    canvas.width = 2160;
    canvas.height = 3840;

    drawHeaderPrefeitura(ctx, canvas.width);

    ctx.fillStyle = "#f0ecec";
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    let x = startX;
    let y = headerHeight + 250;

    ctx.fillStyle = "#242553";
    ctx.fillRect(x, y - 50, colWidth - startX * 2, 60);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Montserrat";
    
    const { prefix, localizacao } = headers["101-799"];
    const ramalWidth = ctx.measureText("999").width + 100;
    const localWidth = ctx.measureText("Prefeitura").width + 500;
    const nomeWidth = colWidth - (ramalWidth + localWidth + 30);
    
    ctx.fillText(prefix, x, y);
    ctx.fillText(localizacao, x + ramalWidth, y);
    ctx.fillText("Nome", x + ramalWidth + localWidth, y);
    
    y += 50;
    ctx.font = "34px Montserrat";

    filteredData.forEach(func => {
        ctx.fillStyle = ["p1"].includes(func.tag) ? "#e5e5df" : "#fafafa";
        ctx.fillRect(x, y - 40, colWidth  - startX * 2, 100);
        
        ctx.fillStyle = "#000000";
        ctx.fillText(func.ramal, x, y);
        ctx.fillText(func.localizacao, x + ramalWidth, y);
        ctx.fillText(func.nome, x + ramalWidth + localWidth, y);
        y += 50;
    });

    drawFooterPrefeitura(ctx, canvas.width, canvas.height);
}

async function fetchDataSaude() {
    const response = await fetch("https://raw.githubusercontent.com/Vmjlol/api-telefones/refs/heads/main/api.json");
    const data = await response.json();

    const filteredData = data.filter(item => {
        const ramalNum = parseInt(item.ramal, 10);
        return ramalNum >= 201 && ramalNum <= 299;
    });

    const ranges = {
        "201-299": filteredData,
    };

    const headers = {
        "201-299": { prefix: "200", localizacao: "Saúde" },
    };

    document.fonts.ready.then(() => {
        drawImageWithDataSaude(ranges, headers);
    });
}

function drawHeaderSaude(ctx, canvasWidth) {
    const headerHeight = 300;
    const img = new Image();
    img.src = "img/telefone2.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, headerHeight);
        
        ctx.fillStyle = "#532424"; 
        ctx.beginPath();
        ctx.roundRect(100, 75, 795, 150, 30);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.font = "70px Montserrat";
        ctx.fillText("Lista de Ramais", 220, 175);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Montserrat";
        ctx.fillText("Saúde", 685, 210);
    };
}

function drawFooterSaude(ctx, canvasWidth, canvasHeight) {
    const footerHeight = 150;
    const rectWidth = 1500;
    const rectHeight = 140;
    const rectX = canvasWidth - rectWidth - 100;
    const rectY = canvasHeight - footerHeight - 80;

    ctx.fillStyle = "#532424";
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Montserrat";
    ctx.fillText("terraboa.pr.gov.br | 0800-115-7700 | (44) 3641-8000", rectX * 1.2, rectY + 90);
}

function drawImageWithDataSaude(ranges, headers) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colWidth = 2160;
    const startX = 100;
    const lineHeight = 25;

    const filteredData = ranges["201-299"];
    let maxRows = filteredData.length;

    const headerHeight = 200;
    const canvasHeight = headerHeight + (maxRows + 5) * lineHeight + 50;

    canvas.width = 2160;
    canvas.height = 3840;

    drawHeaderSaude(ctx, canvas.width);
    
    ctx.fillStyle = "#f0ecec";
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    let x = startX;
    let y = headerHeight + 250;

    ctx.fillStyle = "#532424";
    ctx.fillRect(x, y - 50, colWidth - startX * 2, 60);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Montserrat";
    
    const { prefix, localizacao } = headers["201-299"];
    const ramalWidth = ctx.measureText("999").width + 100;
    const localWidth = ctx.measureText("Localização").width + 500;
    const nomeWidth = colWidth - (ramalWidth + localWidth + 30);
    
    ctx.fillText(prefix, x, y);
    ctx.fillText(localizacao, x + ramalWidth, y);
    ctx.fillText("Nome", x + ramalWidth + localWidth, y);
    
    y += 50;
    ctx.font = "34px Montserrat";

    filteredData.forEach(func => {
        ctx.fillStyle = ["s1"].includes(func.tag) ? "#e5e5df" : "#fafafa";
        ctx.fillRect(x, y - 40, colWidth  - startX * 2, 100);
        
        ctx.fillStyle = "#000000";
        ctx.fillText(func.ramal, x, y);
        ctx.fillText(func.localizacao, x + ramalWidth, y);
        ctx.fillText(func.nome, x + ramalWidth + localWidth, y);
        y += 50;
    });

    drawFooterSaude(ctx, canvas.width, canvas.height);
}

async function fetchDataEducacao() {
    const response = await fetch("https://raw.githubusercontent.com/Vmjlol/api-telefones/refs/heads/main/api.json");
    const data = await response.json();

    const filteredData = data.filter(item => {
        const ramalNum = parseInt(item.ramal, 10);
        return ramalNum >= 301 && ramalNum <= 399;
    });

    const ranges = {
        "301-399": filteredData,
    };

    const headers = {
        "301-399": { prefix: "300", localizacao: "Educação" },
    };

    document.fonts.ready.then(() => {
        drawImageWithDataEducacao(ranges, headers);
    });
}

function drawHeaderEducacao(ctx, canvasWidth) {
    const headerHeight = 300;
    const img = new Image();
    img.src = "img/telefone2.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, headerHeight);
        
        ctx.fillStyle = "#505324"; 
        ctx.beginPath();
        ctx.roundRect(100, 75, 795, 150, 30);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.font = "70px Montserrat";
        ctx.fillText("Lista de Ramais", 220, 175);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Montserrat";
        ctx.fillText("Educação", 635, 210);
    };
}

function drawFooterEducacao(ctx, canvasWidth, canvasHeight) {
    const footerHeight = 150;
    const rectWidth = 1500;
    const rectHeight = 140;
    const rectX = canvasWidth - rectWidth - 100;
    const rectY = canvasHeight - footerHeight - 80;

    ctx.fillStyle = "#505324";
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Montserrat";
    ctx.fillText("terraboa.pr.gov.br | 0800-115-7700 | (44) 3641-8000", rectX * 1.2, rectY + 90);
}

function drawImageWithDataEducacao(ranges, headers) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colWidth = 2160;
    const startX = 100;
    const lineHeight = 25;

    const filteredData = ranges["301-399"];
    let maxRows = filteredData.length;

    const headerHeight = 200;
    const canvasHeight = headerHeight + (maxRows + 5) * lineHeight + 50;

    canvas.width = 2160;
    canvas.height = 3840;

    drawHeaderEducacao(ctx, canvas.width);

    ctx.fillStyle = "#f0ecec";
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    let x = startX;
    let y = headerHeight + 250;

    ctx.fillStyle = "#505324";
    ctx.fillRect(x, y - 50, colWidth - startX * 2, 60);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Montserrat";
    
    const { prefix, localizacao } = headers["301-399"];
    const ramalWidth = ctx.measureText("999").width + 100;
    const localWidth = ctx.measureText("Educação").width + 500;
    const nomeWidth = colWidth - (ramalWidth + localWidth + 30);
    
    ctx.fillText(prefix, x, y);
    ctx.fillText("Localização", x + ramalWidth, y);
    ctx.fillText("Nome", x + ramalWidth + localWidth, y);
    
    y += 50;
    ctx.font = "34px Montserrat";

    filteredData.forEach(func => {
        ctx.fillStyle = ["e1"].includes(func.tag) ? "#e5e5df" : "#fafafa";
        ctx.fillRect(x, y - 40, colWidth  - startX * 2, 100);
        
        ctx.fillStyle = "#000000";
        ctx.fillText(func.ramal, x, y);
        ctx.fillText(func.localizacao, x + ramalWidth, y);
        ctx.fillText(func.nome, x + ramalWidth + localWidth, y);
        y += 50;
    });

    drawFooterEducacao(ctx, canvas.width, canvas.height);
}

async function fetchDataSocial() {
    const response = await fetch("https://raw.githubusercontent.com/Vmjlol/api-telefones/refs/heads/main/api.json");
    const data = await response.json();

    const filteredData = data.filter(item => {
        const ramalNum = parseInt(item.ramal, 10);
        return ramalNum >= 501 && ramalNum <= 599;
    });

    const ranges = {
        "501-599": filteredData,
    };

    const headers = {
        "501-599": { prefix: "500", localizacao: "Social" },
    };

    document.fonts.ready.then(() => {
        drawImageWithDataSocial(ranges, headers);
    });
}

function drawHeaderSocial(ctx, canvasWidth) {
    const headerHeight = 300;
    const img = new Image();
    img.src = "img/telefone2.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, headerHeight);
        
        ctx.fillStyle = "#53244f"; 
        ctx.beginPath();
        ctx.roundRect(100, 75, 795, 150, 30);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.font = "70px Montserrat";
        ctx.fillText("Lista de Ramais", 220, 175);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Montserrat";
        ctx.fillText("Assist. Social", 600, 210);
    };
}

function drawFooterSocial(ctx, canvasWidth, canvasHeight) {
    const footerHeight = 150;
    const rectWidth = 1500;
    const rectHeight = 140;
    const rectX = canvasWidth - rectWidth - 100;
    const rectY = canvasHeight - footerHeight - 80;

    ctx.fillStyle = "#53244f";
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Montserrat";
    ctx.fillText("terraboa.pr.gov.br | 0800-115-7700 | (44) 3641-8000", rectX * 1.2, rectY + 90);
}

function drawImageWithDataSocial(ranges, headers) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colWidth = 2160;
    const startX = 100;
    const lineHeight = 25;

    const filteredData = ranges["501-599"];
    let maxRows = filteredData.length;

    const headerHeight = 200;
    const canvasHeight = headerHeight + (maxRows + 5) * lineHeight + 50;

    canvas.width = 2160;
    canvas.height = 3840;

    drawHeaderSocial(ctx, canvas.width);

    ctx.fillStyle = "#f0ecec";
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    let x = startX;
    let y = headerHeight + 250;

    ctx.fillStyle = "#53244f"; // 003366
    ctx.fillRect(x, y - 50, colWidth - startX * 2, 60);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Montserrat";
    
    const { prefix, localizacao } = headers["501-599"];
    const ramalWidth = ctx.measureText("999").width + 100;
    const localWidth = ctx.measureText("Saúde").width + 500;
    const nomeWidth = colWidth - (ramalWidth + localWidth + 30);
    
    ctx.fillText(prefix, x, y);
    ctx.fillText(localizacao, x + ramalWidth, y);
    ctx.fillText("Nome", x + ramalWidth + localWidth, y);
    
    y += 50;
    ctx.font = "34px Montserrat";

    filteredData.forEach(func => {
        ctx.fillStyle = ["soc1"].includes(func.tag) ? "#e5e5df" : "#fafafa";
        ctx.fillRect(x, y - 40, colWidth  - startX * 2, 100);
        
        ctx.fillStyle = "#000000";
        ctx.fillText(func.ramal, x, y);
        ctx.fillText(func.localizacao, x + ramalWidth, y);
        ctx.fillText(func.nome, x + ramalWidth + localWidth, y);
        y += 50;
    });

    drawFooterSocial(ctx, canvas.width, canvas.height);
}

async function fetchDataSerpub() {
    const response = await fetch("https://raw.githubusercontent.com/Vmjlol/api-telefones/refs/heads/main/api.json");
    const data = await response.json();

    const filteredData = data.filter(item => {
        const ramalNum = parseInt(item.ramal, 10);
        return ramalNum >= 601 && ramalNum <= 799;
    });

    const ranges = {
        "601-799": filteredData,
    };

    const headers = {
        "601-799": { prefix: "#", localizacao: "Localização" },
    };

    document.fonts.ready.then(() => {
        drawImageWithDataSerpub(ranges, headers);
    });
}

function drawHeaderSerpub(ctx, canvasWidth) {
    const headerHeight = 300;
    const img = new Image();
    img.src = "img/telefone2.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, headerHeight);
        
        ctx.fillStyle = "#2a5324"; 
        ctx.beginPath();
        ctx.roundRect(100, 75, 795, 150, 30);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.font = "70px Montserrat";
        ctx.fillText("Lista de Ramais", 220, 175);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Montserrat";
        ctx.fillText("Serviços Públicos, Esporte e Previdência", 400, 210);
    };
}

function drawFooterSerpub(ctx, canvasWidth, canvasHeight) {
    const footerHeight = 150;
    const rectWidth = 1500;
    const rectHeight = 140;
    const rectX = canvasWidth - rectWidth - 100;
    const rectY = canvasHeight - footerHeight - 80;

    ctx.fillStyle = "#2a5324";
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Montserrat";
    ctx.fillText("terraboa.pr.gov.br | 0800-115-7700 | (44) 3641-8000", rectX * 1.2, rectY + 90);
}

function drawImageWithDataSerpub(ranges, headers) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colWidth = 2160;
    const startX = 100;
    const lineHeight = 25;

    const filteredData = ranges["601-799"];
    let maxRows = filteredData.length;

    const headerHeight = 200;
    const canvasHeight = headerHeight + (maxRows + 5) * lineHeight + 50;

    canvas.width = 2160;
    canvas.height = 3840;

    drawHeaderSerpub(ctx, canvas.width);

    ctx.fillStyle = "#f0ecec";
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);

    let x = startX;
    let y = headerHeight + 250;

    ctx.fillStyle = "#2a5324";
    ctx.fillRect(x, y - 50, colWidth - startX * 2, 60);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Montserrat";
    
    const { prefix, localizacao } = headers["601-799"];
    const ramalWidth = ctx.measureText("999").width + 100;
    const localWidth = ctx.measureText("Prefeitura").width + 500;
    const nomeWidth = colWidth - (ramalWidth + localWidth + 30);
    
    ctx.fillText(prefix, x, y);
    ctx.fillText(localizacao, x + ramalWidth, y);
    ctx.fillText("Nome", x + ramalWidth + localWidth, y);
    
    y += 50;
    ctx.font = "34px Montserrat";

    filteredData.forEach(func => {
        ctx.fillStyle = ["pub1"].includes(func.tag) ? "#e5e5df" : "#fafafa";
        ctx.fillRect(x, y - 40, colWidth  - startX * 2, 100);
        
        ctx.fillStyle = "#000000";
        ctx.fillText(func.ramal, x, y);
        ctx.fillText(func.localizacao, x + ramalWidth, y);
        ctx.fillText(func.nome, x + ramalWidth + localWidth, y);
        y += 50;
    });

    drawFooterSerpub(ctx, canvas.width, canvas.height);
}


