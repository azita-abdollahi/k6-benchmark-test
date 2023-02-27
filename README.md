##  Why is K6?

​	The biggest question you should ask yourself, Why you should care about K6. If you are a GUI/excel person, and you 	are happy with tools like JMeter or load-runner. Then you should not think of learning K6. The biggest reason you 	   	should start exploring K6 are:

1. **Written in Golang:** Just like other tools written in Golang. K6 is very fast
2. **Nice community**
3. **Cloud support:** K6 is built cloud-first keeping in mind.
4. **JavaScript:** Easy scripting using JavaScript syntax
5. **Reusable functions/script:** Using the Node.js ecosystem, You can easily share and reuse the script between multiple projects.
6. **Developer friendly:** The scripts are written in JavaScript. It makes it easy to do fast experimentation and release.
7. **Docker integration:** K6 has nice documentation to explain the docker integration. It makes it easy to run in any system.
8. **Multiple result outputs:** K6 supports multiple types of [report data generation tools.](https://k6.io/docs/getting-started/results-output)
9. **Performance monitoring:** Using K6 reporting tools, You can use performance monitoring tools like Grafana to watch real-time data and plot some nice-looking graphs(heatmaps).

  For more, you can refer to the [K6 official website](https://k6.io/).![ikg](C:\Users\AZITA\Pictures\ikg.png)

[K6](https://github.com/loadimpact/k6) is an awesome open-source load testing framework written in Go. It is highly efficient and capable of generating high loads with hundreds of concurrent connections.

K6 can be used independently as a command-line tool to run load tests, or combined with other tools for different visualisations and analysis. Adding InfluxDB and Grafana, K6 gives a very powerful visualisation of the load test as it runs.

Running a load test requires that the InfluxDB and Grafana services are already running in the background. 

[InfluxDB](https://github.com/influxdata/influxdb) is a fast time-series database, also written in Go, which is supported by K6 as an output target for realtime monitoring of a test. Whilst K6 is running the load test, it will stream statistics about the run to InfluxDB.

A **time series database (TSDB)** is a software system that is optimized for storing and serving [time series](https://en.wikipedia.org/wiki/Time_series) through associated pairs of time(s) and value(s).

[Grafana](https://github.com/grafana/grafana) is a beautiful browser UI for data visualisation, which supports InfluxDB as a data source. Using a live updating set of graphs it will display the details of the run.

# Docker Compose

For run the sample express api (write this route for k6 benchmark test)

```
#in express-api directory
docker compose up -d
```

k6 scripts are in the `samples` directory.

Start the docker compose environment.

```
#in k6 directory
docker compose up -d 
```

1. Use the k6 Docker image to run the k6 script and send metrics to the InfluxDB container started on the previous step.

   ```
   docker compose run --rm -it k6 run ./scripts/test_name.js
   or 
   add below code in the k6 service in docker-compose.yml
   command: ["run", "/scripts/test_name.js"]
   ```

2. Visit http://localhost:3000/ to view results in Grafana.

3. Enter user and password of grafana service in docker-compose.yml

4. in left sidebar, click on dashboards, in search bar write your dashboard name(for example in this repo: search K6 Load Testing Results)

For more detail check the [**Here**](https://github.com/azita-abdollahi/k6-benchmark-test/wiki)



## Reference:

[Documentation | Grafana Labs](https://grafana.com/docs/)

[InfluxData Documentation](https://docs.influxdata.com/)

[k6 Documentation](https://k6.io/docs/)

[Time series database - Wikipedia](https://en.wikipedia.org/wiki/Time_series_database)

[Beautiful Load Testing With K6 and Docker Compose | by Luke Thompson | The Startup | Medium](https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3)

