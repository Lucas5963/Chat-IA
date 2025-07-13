/* 
VÁRIAVEIS - Um pedacinho de memória do computador
que eu posso guardar o que eu quiser.

FUNCOES
É um pedacinho de código QUE, só executa 
Quando é chamado.

documet = HTML
querySelector = buscar alguém no HTML

fetch - ferramenta para se comunicar com algo fora do codigo

[x] Descobrir quando o botão foi clicado
[x] Pegar o que foi escrito no Input
[x] Enviar para o N8N
[x] Receber o que o N8N Respondeu
[x] Colocar na Tela o que ele respondeu    

*/
let webhook = "https://lucasaraujo6878.app.n8n.cloud/webhook/Chat-IA"

// funcao assincrona
async function cliqueiNoBotao() {
    let textoInput = document.querySelector(".input-animacao").value
    let areaChat = document.getElementById("area-chat")
    let botao = document.querySelector(".botao-magica")

    if (!textoInput || !areaChat || !botao) {
        console.error("Elemento(s) não encontrado(s):", { textoInput, areaChat, botao })
        return
    }

    // Adicionar mensagem do usuário
    areaChat.innerHTML += `<div class="mensagem-usuario">Você: ${textoInput}</div>`

    botao.disabled = true
    botao.textContent = "Criando..."
    botao.style.background = '#888888'

    try {
        let resposta = await fetch(webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: textoInput
        })

        let resultado = await resposta.text()
        console.log("Resposta do webhook:", resultado)

        // Adicionar mensagem do atendente
        areaChat.innerHTML += `<div class="mensagem-atendente">Bot: ${resultado}</div>`

        // Rolar para a última mensagem
        areaChat.scrollTop = areaChat.scrollHeight
    } catch (erro) {
        console.error("Erro na requisição:", erro)
        areaChat.innerHTML += `<div class="mensagem-atendente">Bot: Erro ao processar a resposta.</div>`
        areaChat.scrollTop = areaChat.scrollHeight
    }

    botao.disabled = false
    botao.textContent = "Enviar✨"
    botao.style.background = '#37E359'

    // Limpar o input
    document.querySelector(".input-animacao").value = ""
}