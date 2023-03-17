# Satang Corp Assignment (Websocket)
### Tech Stack
- React (Vite)
- Typescript
- Redux + Redux Toolkit
- Redux Saga

### How to run
    With Docker
        - run docker application
        - docker build -t satang-dev-socket .
        - docker run --rm  --name satang-dev-socket -p 5173:5173 satang-dev-socket:latest
    With NPM
        - npm install --legacy-peer-deps
        - npm run start