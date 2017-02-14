# Project TSK
TSK is a simple ad checkout API that, given as input JSON containing customer information and a set of ads, can calculate the final price considering commercial rules that apply to specific customers.

## How to run
The easiest way to run TSK is to build it as a [docker](https://www.docker.com/) image. To do so you must first configure docker in your system(in Mint Linux 18.1 I did it following [these steps](http://linuxbsdos.com/2016/12/13/how-to-install-docker-and-run-docker-containers-on-linux-mint-1818-1/)).

After that, inside the folder where you cloned the git repository, you can build the image by running
```
lucas@lucas-VirtualBox ~/tsk $ sudo docker build -t ltrias/tsk .
```
If everything went well you should be able to list the images like in the example below:
```
lucas@lucas-VirtualBox ~/tsk $ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ltrias/tsk          latest              ae070844d83f        21 seconds ago      109 MB
node                alpine              0895ecd79009        12 days ago         54.6 MB
```

To start the a container with the TSK application execute
```
sudo docker run -p 9999:9999 ltrias/tsk
```
The `-p public_port:private_port` create a mapping between a public port on the host and a private port on the container, so you can choose which port to use if 9999 is occupied in your machine. After thar you can verify the status of your container with
```
lucas@lucas-VirtualBox ~ $ sudo docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS                              NAMES
da3e0eba4d41        ltrias/tsk          "npm start"         About a minute ago   Up 59 seconds       8080/tcp, 0.0.0.0:9999->9999/tcp   romantic_bohr
```

You can read the application logs running
```
sudo docker logs -f da3e0eba4d41
```
where da3e0eba4d41 is the container id you got with `docker ps`

### How to run without docker
If you don't want to use docker then you must have npm installed in your machine and run
```
npm install
```
followed by
```
npm start
```
## Running the automated tests
TSK has automated unit and API tests.
### Running unit tests
If still not executed,
```
npm install
```
then 
```
npm test
```

### Running API tests
First make sure that the application is running either on port 9999 or on a port specified by PORT environment variable. Then, if still not executed,
```
npm install
```
followed by
```
npm run test-app-running
```

It will exercise the following scenarios


|Customer|Ads|Total|
|--------|---|-----|
|Default|classic, standout, premium|987.97|
|Unilever|classic, classic, classic, premium|934.97|
|Apple|standout, standout, standout, premium|1294.96|
|Nike|premium, premium, premium, premium|1519.96|


## API
The TSK API is JSON based. To calculate the total value of a checkout you must POST it according to the following format
``` 
{
	"customer": "default",
	"ads": ["standout", "classic"]
}
```
Valid ad types are classic, standout and premium

For example, testing using cURL:
```
lucas@lucas-VirtualBox ~ $ curl 'http://localhost:9999/checkout' -H'Content-Type:application/json' -d'{"customer":"default", "ads":["standout","classic"]}'
```
will return the checkout with total value:
```
{"customer":"default","ads":[{"type":"standout","value":322.99},{"type":"classic","value":269.99}],"total":592.98}
```

# Special remarks
As it may seem strange at first sight, some aspects were intentionally neglected, for the reasons explained

## Lack of database
TSK is flexible enough to handle as many commercial conditions, customers and ad types as needed. I decided to implement without a database because using a database would bring configuration overhead and would not bring much more insights about my coding style and problem solving strategy as, in the end of the day, using a database is no more than making some calls to a library and, maybe, freeing resources after that. The data source is in a single point of the code and is easily replaceable by a database though.

## Parallelism and optimized resource use
Nowadays any processor is multi-core. In spite of that, TSK has not been not implemented to make use of multi-cores or to use  parallel processing as it is not meant to be deployed in production and does not have to be scalable.

## Naive Logging
Asynchronous logging and log rotation are desirable when logging to local or remote file systems. On the other hand using a log indexer such as graylog, lognit or splunk is a good idea when working on containerized environments. As the expected log volume is small and docker can negotiate log handling with the host TSK has been implemented logging to console.

## Ads without attributes
As for the purpose of the test the only important ad attributes are value and type TSK does not require any other ad data. That is very distinct from a real life situation where an ad would probably have title, description, etc
