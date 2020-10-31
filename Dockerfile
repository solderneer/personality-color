FROM nginx:stable-alpine
COPY . /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
