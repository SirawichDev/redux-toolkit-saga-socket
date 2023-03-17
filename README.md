# Satang Corp Assignment (Websocket)

## Branch
there are seperated into 2 branch 
- ``` main ``` is websocket connection
- ``` feature/market-api-integration ``` normal api connection (with delay called)
### Tech Stack
- React (Vite)
- Typescript
- Redux + Redux Toolkit
- Redux Saga
- WS

### How to run
    With Docker
        - run docker application
        - docker build -t satang-dev-socket .
        - docker run --rm  --name satang-dev-socket -p 5173:5173 satang-dev-socket:latest
    With NPM
        - npm install --legacy-peer-deps
        - npm run start