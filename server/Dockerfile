FROM node:10

# Create app directory
WORKDIR /home/app

RUN useradd app
COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

RUN chown -R app:app /home/app
USER app

COPY . .


EXPOSE 4000
CMD ["npm", "run", "pm2"]
