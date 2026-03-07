FROM electronuserland/builder:22

WORKDIR /project/desktop

CMD ["node", "./scripts/build-release-linux-container.mjs"]
