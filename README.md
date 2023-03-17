# Satang Corp Assignment (Websocket)


## API
i'm using Satang api (public) for this project you can checkout they website here (https://docs.satangcorp.com/#auth-info-ed364eb6-d202-4cf4-a3fa-058262afdaab)
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