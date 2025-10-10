// assets/script.js - Funcionalidades Essenciais (Sem Biblioteca Externa)

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================
    // 1. FUNCIONALIDADE DO MENU MOBILE
    // ==========================================================
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('main-nav');

    if (menuToggle && nav) {
        // Alterna a classe 'active' no clique para mostrar/esconder o menu CSS
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em qualquer link (Melhora UX no mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    }

    // ==========================================================
    // 2. INTEGRAÇÃO DO FORMULÁRIO (CHAVE PARA CAPTAÇÃO)
    // ==========================================================
    
    const leadForm = document.getElementById('lead-form');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pega os dados do formulário
            const nome = leadForm.querySelector('input[type="text"]').value;
            const whatsapp = leadForm.querySelector('input[type="tel"]').value;
            const servico = leadForm.querySelector('select').value;
            
            // Converte o número de telefone para o formato internacional (opcional, mas profissional)
            const cleanWhatsapp = whatsapp.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            
            // Mensagem padrão para enviar ao seu WhatsApp
            const message = `Olá, meu nome é ${nome}. Gostaria da avaliação gratuita em 15 minutos! Meu interesse é em: ${servico || 'Não Especificado'}. Meu contato é ${whatsapp}.`;
            
            // Codifica a URL para o WhatsApp
            const whatsappUrl = `https://wa.me/55${cleanWhatsapp}?text=${encodeURIComponent(message)}`;
            
            console.log("Formulário Submetido. Redirecionando para o WhatsApp...");
            
            // Redireciona o usuário para o seu WhatsApp (aqui é o seu CRM)
            window.open(whatsappUrl, '_blank');
            
            // Opcional: Limpar o formulário após o redirecionamento
            leadForm.reset();

            // NOTA: Em projetos mais complexos, o código AJAX para enviar os dados para 
            // uma planilha (Google Sheets) ou CRM ocorreria AQUI antes do redirecionamento.
            // Para R$ 0, o WhatsApp é o CRM.
        });
    }
    
});
