FROM electronuserland/builder:22

WORKDIR /project/desktop

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

COPY package.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile --ignore-scripts

COPY . .
RUN yarn electron-builder install-app-deps

CMD ["./node_modules/.bin/tsx", "./scripts/build/build-release-linux-container.ts"]
