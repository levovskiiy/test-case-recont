FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
LABEL maintainer="lev.cherepanov2001@yandex.ru"

RUN corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile && \
    pnpm add -D esbuild rollup

COPY . .

CMD ["pnpm", "run", "dev"]

