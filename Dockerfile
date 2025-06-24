FROM node:18-alpine

# Instalar netcat para verificar conectividade do banco
RUN apk add --no-cache netcat-openbsd

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build

# Remover dependências de desenvolvimento
RUN npm prune --production

# Tornar o script de inicialização executável
RUN chmod +x docker-entrypoint.sh

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Mudar propriedade dos arquivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expor porta
EXPOSE 3000

# Usar script de inicialização
CMD ["./docker-entrypoint.sh"] 