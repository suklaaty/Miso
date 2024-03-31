FROM node:21-alpine
WORKDIR /app
COPY . .

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
EXPOSE 3000

RUN npm install && npm cache clean --force
RUN npm run check-env
RUN npm run build-db
RUN npm run build
RUN npm run geolite2

CMD ["npm", "run", "start"]