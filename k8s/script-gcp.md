# Implementación en Google Cloud Platform

## Step by Step

1. Crear name space, solo en el caso que no exista previamente

    - para ver los name space existentes

            $ kubectl get ns
    
    debe mostrar el name space de "production"

    - Aplicar name space

            $ kubectl apply -f 00-namespace.yml


### Implementar Back-End

1. Implementar database deployment k8s/back-end
   
   - El disk debe existir previamente y en la sección  "pdName" del archivo 
   debe ir el nombre del disco
        
            $ kubectl -n production apply -f 00-deployment-database.yml

   Esto debe de crear un deployment  y dos servicios(ClusterIP, LoadBalancer)

2. Implementar back-end deployment k8s/back-end

    - El disk debe existir previamente y en la sección  "pdName" del archivo 
   debe ir el nombre del disco

            $ kubectl -n production apply -f 01-deployment-app.yml
    
    Esto debe de crear un deployment y dos servicios(ClusterIP, LoadBalancer)