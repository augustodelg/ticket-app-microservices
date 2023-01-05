# 🎟️ TICKET APP (Tacket)
**Event-oriented microservices** application for buying and selling tickets. Fully implemented in express and typescript on the backend using shared libraries (in this case npm) to share code between services, JWT for session management, ,MongoDB for the storage of each service and NATS to intercommunicate all the services of the app. On the client side the application uses Next.js with Tailwind. Regarding the application infrastructure, everything is designed to be deployed in a kubernetes cluster even in the development environment using skaffold.

## *FULL DOCUMENTATION IN PROGRESS* ⏳

**FIGMA IN PROGRESS**⏳ : https://www.figma.com/file/hEQrtHYTZMCJLDiqib06Yv/tacket?node-id=0%3A1

### PREVIEW (Implemented):
![image](https://user-images.githubusercontent.com/28931847/187996100-136fd7dc-73a7-4065-8c09-aa70ed511536.png)

![image](https://user-images.githubusercontent.com/28931847/188003208-9b059086-d1e7-4cd6-bef6-303596c63659.png)

![image](https://user-images.githubusercontent.com/28931847/188003314-2c1be504-b816-4dd9-ac30-9cc9a8940bdb.png)

![image](https://user-images.githubusercontent.com/28931847/188003366-f0f692d8-de03-42cd-811a-267dfd0ba946.png)


### Extra

NEEDED NGROK: ngrok http --host-header=rewrite tacket.dev:80

EXEC: 
kubectl create secret generic jwt-secret --from-literal JWT_KEY=jwtsecrettest
kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
