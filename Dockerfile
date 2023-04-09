# Base image
FROM node:14

# Créez le dossier de travail
WORKDIR /app

# Copiez les fichiers du backend
COPY backend/package*.json ./backend/
COPY backend/ /app/backend/

# Copiez les fichiers du frontend
COPY frontend/package*.json ./frontend/
COPY frontend/ /app/frontend/

# Installez les dépendances du backend
RUN cd backend && npm install

# Installez les dépendances du frontend
RUN cd frontend && npm install

# Exposez le port du serveur
EXPOSE 3000

# Commande de démarrage du serveur
CMD ["npm", "start"]
