# 🚗 Sistema de Rastreamento Veicular

Um sistema completo de rastreamento e gestão de frotas desenvolvido com React, TypeScript e Tailwind CSS. Oferece monitoramento em tempo real, gestão de veículos, relatórios detalhados e portal dedicado para clientes.

<img width="1902" height="906" alt="Captura de tela 2025-07-14 103414" src="https://github.com/user-attachments/assets/25e74e16-106c-4f7a-b2c0-bc8f10914c98" />
<img width="1895" height="916" alt="Captura de tela 2025-07-14 103441" src="https://github.com/user-attachments/assets/f35537c5-e2af-41ca-ae37-f710a4fead9b" />
<img width="1887" height="897" alt="Captura de tela 2025-07-14 103353" src="https://github.com/user-attachments/assets/053f1fad-0e2d-438b-a975-032221e303d6" />

## 🌟 Funcionalidades Principais

### 📊 Dashboard Administrativo
- **Visão geral completa** da frota com estatísticas em tempo real
- **Mapa interativo** com localização de todos os veículos
- **Alertas centralizados** para monitoramento de eventos críticos
- **Gestão de clientes** com controle de acesso e permissões

### 🚛 Gestão de Veículos
- **Cadastro completo** de veículos com informações detalhadas
- **Monitoramento em tempo real** de localização, velocidade e status
- **Histórico de manutenção** e controle de vencimentos
- **Análise de consumo** de combustível e performance

### 🗺️ Rastreamento e Rotas
- **GPS em tempo real** com atualização automática
- **Histórico de rotas** com análise detalhada de trajetos
- **Geofencing** com alertas de entrada/saída de áreas
- **Otimização de rotas** e análise de eficiência

### 📈 Relatórios e Analytics
- **Relatórios personalizáveis** por período e veículo
- **Análise de performance** da frota
- **Métricas de consumo** e custos operacionais
- **Exportação** em múltiplos formatos

### 🔔 Sistema de Alertas
- **Alertas de velocidade** com limites configuráveis
- **Notificações de manutenção** preventiva
- **Alertas de geofencing** para áreas restritas
- **Monitoramento de inatividade** prolongada

### 👥 Portal do Cliente
- **Dashboard personalizado** com dados específicos do cliente
- **Acesso restrito** apenas aos veículos autorizados
- **Interface simplificada** focada na experiência do usuário
- **Relatórios dedicados** para cada cliente

## 🚀 Demo Online

Acesse a demonstração: [https://visionary-panda-e666fd.netlify.app](https://visionary-panda-e666fd.netlify.app)

### 🔐 Contas de Demonstração

**Administrador:**
- Email: `admin@trackveiculos.com`
- Senha: `admin123`

**Cliente:**
- Email: `carlos@transportes.com`
- Senha: `cliente123`

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Netlify

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/sistema-rastreamento-veicular.git
cd sistema-rastreamento-veicular
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o projeto em desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── admin/              # Componentes do painel administrativo
│   │   ├── AdminDashboard.tsx
│   │   └── ClientManagement.tsx
│   ├── auth/               # Componentes de autenticação
│   │   └── LoginForm.tsx
│   ├── client/             # Componentes do portal do cliente
│   │   ├── ClientDashboard.tsx
│   │   ├── ClientVehicles.tsx
│   │   ├── ClientRoutes.tsx
│   │   └── ...
│   ├── common/             # Componentes compartilhados
│   │   └── LoadingSpinner.tsx
│   ├── Dashboard.tsx       # Dashboard principal
│   ├── VehicleList.tsx     # Lista de veículos
│   ├── VehicleMap.tsx      # Mapa interativo
│   ├── RouteHistory.tsx    # Histórico de rotas
│   ├── Reports.tsx         # Relatórios
│   ├── Alerts.tsx          # Sistema de alertas
│   ├── Settings.tsx        # Configurações
│   ├── Header.tsx          # Cabeçalho
│   └── Sidebar.tsx         # Menu lateral
├── App.tsx                 # Componente principal
├── main.tsx               # Ponto de entrada
└── index.css              # Estilos globais
```

## 🎨 Design System

### Cores Principais
- **Primária:** Azul (#3B82F6)
- **Secundária:** Cinza (#6B7280)
- **Sucesso:** Verde (#10B981)
- **Aviso:** Amarelo (#F59E0B)
- **Erro:** Vermelho (#EF4444)

### Tipografia
- **Fonte:** Inter (sistema)
- **Tamanhos:** 12px, 14px, 16px, 18px, 24px, 32px
- **Pesos:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🔧 Funcionalidades Técnicas

### Autenticação
- Sistema de login com validação
- Controle de sessão com localStorage
- Diferentes níveis de acesso (Admin/Cliente)

### Responsividade
- Design mobile-first
- Breakpoints otimizados para todos os dispositivos
- Interface adaptável para tablets e desktops

### Performance
- Componentes otimizados com React
- Lazy loading de componentes
- Build otimizado com Vite

## 📱 Compatibilidade

- **Navegadores:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos:** Desktop, Tablet, Mobile
- **Resoluções:** 320px - 4K

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto:

- **Email:** suporte@trackveiculos.com
- **Documentação:** [Wiki do Projeto](https://github.com/seu-usuario/sistema-rastreamento-veicular/wiki)
- **Issues:** [GitHub Issues](https://github.com/seu-usuario/sistema-rastreamento-veicular/issues)

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] Integração com APIs de GPS reais
- [ ] Notificações push em tempo real
- [ ] App mobile nativo
- [ ] Integração com sistemas de pagamento
- [ ] API REST completa
- [ ] Dashboard de analytics avançado
- [ ] Suporte a múltiplos idiomas

### Melhorias Planejadas
- [ ] Otimização de performance
- [ ] Testes automatizados
- [ ] Documentação da API
- [ ] Sistema de backup automático
- [ ] Integração com IoT devices

---

**Desenvolvido com ❤️ para gestão eficiente de frotas**

