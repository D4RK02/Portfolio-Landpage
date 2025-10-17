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
                // Adiciona um pequeno atraso para que a navegação ocorra antes de fechar
                setTimeout(() => {
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                }, 300);
            });
        });
    }

    // ==========================================================
    // 2. INTEGRAÇÃO DO FORMULÁRIO (CHAVE PARA CAPTAÇÃO)
    // ==========================================================
    
    const leadForm = document.getElementById('lead-form');

    // Nota: O formulário só está presente no index.html que você enviou.
    // Se você incluir um formulário com id="lead-form" em outras páginas, ele funcionará.
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pega os dados do formulário
            const nome = leadForm.querySelector('input[type="text"]').value;
            const whatsapp = leadForm.querySelector('input[type="tel"]').value;
            const servico = leadForm.querySelector('select').value;
            
            // Converte o número de telefone para o formato internacional
            const cleanWhatsapp = '55' + whatsapp.replace(/\D/g, ''); // Garante o 55 no início
            
            // Mensagem padrão para enviar ao seu WhatsApp
            const message = `Olá, meu nome é ${nome}. Gostaria da avaliação gratuita em 15 minutos! Meu interesse é em: ${servico || 'Não Especificado'}. Meu contato é ${whatsapp}.`;
            
            // Codifica a URL para o WhatsApp
            const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`;
            
            console.log("Formulário Submetido. Redirecionando para o WhatsApp...");
            
            // Redireciona o usuário para o seu WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Opcional: Limpar o formulário após o redirecionamento
            leadForm.reset();
        });
    }

    // ==========================================================
    // 3. LÓGICA DO DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO (NOVO)
    // ==========================================================
    const navLinks = document.querySelectorAll('.desktop-nav a');
    const path = window.location.pathname;
    // Pega o nome do arquivo (ex: index.html), se for a raiz, assume 'index.html'
    const page = path.split("/").pop().toLowerCase() || 'index.html'; 

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').toLowerCase().replace('index.html', '');
        const pageClean = page.replace('index.html', '');
        
        // Remove âncoras para simplificar a comparação, exceto se a URL for só a âncora (como no Contato da home)
        let linkTarget = linkHref.split('#')[0];

        // Se o linkHref for uma âncora (ex: #contato), não destacamos ele como página principal.
        if (linkTarget.length === 0) {
            return;
        }

        // Se o href for vazio (link da home) ou contiver o nome da página (ex: planos.html), ativamos.
        // A lógica do 'index.html' precisa ser tratada, pois a página raiz é muitas vezes apenas '/'.
        if (linkTarget === pageClean || (pageClean === '' && linkTarget === '')) {
            
            // Remove a classe de destaque 'primary-cta' se estiver no HTML fixo,
            // e aplica a classe 'active-link'
            link.classList.remove('primary-cta'); 
            link.classList.add('active-link');

            // Adiciona a classe primary-cta de volta ao link de Planos, já que ele é o CTA principal
            // Mas só se ele NÃO for a página ativa (para não ter dois estilos conflitantes)
            if (link.getAttribute('href') === 'planos.html' && link.classList.contains('active-link')) {
                 link.classList.remove('active-link');
                 link.classList.add('primary-cta');
            }
        }
    });
    
});
