FROM node:alpine

# アプリケーションディレクトリを作成する
WORKDIR /api

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json /api/

RUN npm install

# アプリケーションのソースをバンドルする
COPY . /api/


EXPOSE 8080
CMD [ "npm", "start" ]