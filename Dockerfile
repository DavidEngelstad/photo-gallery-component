# FROM node:8.4.0

# RUN mkdir /app
# ADD . /app
# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

# RUN npm install --quiet

# COPY . .
FROM node:9
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . /app
CMD npm start