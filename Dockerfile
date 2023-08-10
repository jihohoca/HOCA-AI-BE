# development stage
FROM --platform=linux/amd64 node:14-alpine as base

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ecosystem.config.json ./

COPY ./src ./src

RUN ls -a

RUN yarn install --pure-lockfile && yarn compile

# production stage

FROM base as production

WORKDIR /usr/prod/app

ENV NODE_ENV=production
# Port number
ENV PORT=3000

# URL of the Mongo DB
ENV MONGODB_URL=mongodb+srv://yorknguyen3008:Hailung3008.@cluster0.yb35uvy.mongodb.net/nodedatabase

# JWT
# JWT secret key
ENV JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
ENV JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
ENV JWT_REFRESH_EXPIRATION_DAYS=30
# Number of minutes after which a reset password token expires
ENV JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Number of minutes after which a verify email token expires
ENV JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
ENV SMTP_HOST=email-server
ENV SMTP_PORT=587
ENV SMTP_USERNAME=email-server-username
ENV SMTP_PASSWORD=email-server-password
ENV EMAIL_FROM=support@yourapp.com

# Cookie configs
ENV COOKIE_SECRET=thisisasamplesecret

# URL of client application
ENV CLIENT_URL=http://localhost:5000
#OPENAPI 
ENV OPENAPI_KEY=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
ENV OPENAPI_MODEL=gpt-3.5-turbo-0301



COPY package.json yarn.lock ecosystem.config.json ./

RUN yarn install --production --pure-lockfile

COPY --from=base /usr/src/app/dist ./dist
# start app
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["yarn", "start"]

EXPOSE 3000