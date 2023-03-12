# Satang Corp Assignment
### Tech Stacks
- React (Vite)
- Typescript
- Redux + Redux Toolkit
- Redux Saga

### How to run
    With Docker
        - run docker application
        - docker build -t satang-dev-api .
        - docker run --rm  --name satang-dev-api -p 5173:5173 satang-dev-api:latest
    With NPM
        - npm install --legacy-peer-deps
        - npm run start