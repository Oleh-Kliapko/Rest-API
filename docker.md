`docker version` - версія докера
`docker pull node` - качаємо ноду
`docker build -t <image-name> .` - створення свого іменованого образу
`docker images` - список образів
`docker image inspect <image-name-or-id>` - інформація по образу
`docker rmi <image-name-or-id>` - видаляємо образ
`docker images prune` - видаляємо усі образи, що не використовуються
`docker images prune -a` - видаляємо усі образи
`docker tag <old-image-name> <repository-name>` - перейменовуємо образ перед заливкою на DockerHub (по суті створюється новий) у формат "логін DockerHub"/"назва репозиторію" (наприклад, `olehkliapko/goit-restapi`)
`docker push <repository-name>` - заливаємо образ на DockerHub

`docker run -p 3000:3000 -d --rm --name <container-name> <image-name-or-id>` - створюємо іменований контейтер на порті 3000 з автоматичним видаленням після зупинки
`docker ps` - показати усі активні контейнери
`docker ps -a` - показати усі контейнери
`docker rm <container-name-or-id>` - видалення контейнеру
`docker stop <container-name-or-id>` - зупинка контейнеру
`docker attach <container-name-or-id>` - приєднання до контейнеру ( для отримання інтерактивного сеансу всередині цього контейнера )
`docker logs <container-name-or-id>` - дивимося що відбувається в контейнері
`docker container prune` - видаляємо усі контейнери, що не використовуються
`docker container prune -a` - видаляємо усі контейнери
