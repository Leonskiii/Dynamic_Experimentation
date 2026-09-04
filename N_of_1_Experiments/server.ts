// import {IncomingMessage} from "node:http";
// import {Client} from 'pg';
// import {ServerResponse} from "node:http";
//
// /*
//
//   init db:
//
// drop table if exists experiment cascade;
// create table IF NOT EXISTS experiment(
//   experiment_name text primary key,
//   code text
// );
// insert into experiment values('Test', 'some code');
//
// drop table if exists requested_execution_id cascade;
// create table IF NOT EXISTS requested_execution_id(
//   experiment_name text references experiment,
//   execution_id text,
//   requested_at timestamp,
//   constraint pk primary key (experiment_name, execution_id)
// );
//
// ALTER DATABASE experimentation OWNER TO softwarescience;
// ALTER TABLE experiment OWNER TO softwarescience;
// ALTER TABLE requested_execution_id OWNER TO softwarescience;
//
//
// drop function if exists request_experiment_execution_key;
// CREATE OR REPLACE FUNCTION request_experiment_execution_key(experiment text) returns text as $$
//   DECLARE
//     var text;
// 	is_contained boolean;
// 	done boolean;
//   BEGIN
//     done := false;
// 	while NOT done loop
// 	    begin
// 		  insert into requested_execution_id (experiment_name, execution_id, requested_at)
// 						SELECT
// 								experiment,
// 								(SELECT md5(random()::text)) || (SELECT md5(random()::text)) ||  (SELECT md5(random()::text)) as random_number,
// 								NOW() returning requested_execution_id.execution_id into var;
// 		  return var;
// 		  exception when unique_violation then
//   			done :=false;
// 		  end;
//     end loop;
// END;
// $$ language plpgsql;
//
//
// select request_experiment_execution_key('Test')
// select * from requested_execution_id
//
//
//
//
//  */
// const express = require('express')
//
// const http = require('http');
// const https = require('https');
// const fs = require('fs');
//
// class Software_Science_Request {}
// class Experiment_Request extends Software_Science_Request {
//     experiment_name;
//
//     constructor(experiment_name: string) {
//         super();
//         this.experiment_name = experiment_name;
//     }
//
//     do_action(response: ServerResponse) {
//         let html_template:string = fs.readFileSync('./experiments/Experiment_Template.html').toString();
//         html_template = html_template.split('SOFTWARE_SCIENCE_VARIABLE_TITLE').join(this.experiment_name);
//         response.writeHead(200,  {'Content-Type': 'text/html; charset=UTF-8'});
//         response.end(html_template);
//     }
// }
//
// class Code_Request extends Experiment_Request {
//     experiment_name;
//
//     constructor(experiment_name: string) {
//         super(experiment_name);
//     }
//     do_action(response: ServerResponse) {
//         response.writeHead(200,  {'Content-Type': 'application/javascript; charset=UTF-8'});
//         let connectionURL = 'postgresql://softwarescience:softwarescience@localhost:5432/experimentation';
//         const client:Client = new Client(connectionURL);
//         client.connect(()=> {
//             client.query("select sources from experiment where experiment_name=$1", [this.experiment_name], (err, res)=> {
//                 response.end(res.rows[0]['sources']);
//                 client.end();
//             });
//         });
//
//
//     }
// }
//
// class Error_Request extends Experiment_Request {
//     constructor(experiment_name: string) {
//         super(experiment_name);
//     }
// }
//
//
//
// class ID_Request extends Experiment_Request {
//
// }
//
//
// function get_software_science_request(
//                                             request:IncomingMessage
//                                      )
// : Experiment_Request
// {
//
//
//
//
//     let parameters = request.url;
//     let path_elements = parameters.split("/");
//     let experiment_name;
//     let last_element = ()=>path_elements[path_elements.length - 1];
//
//     if(path_elements.length > 4) {
//         if (last_element() == "experiment_configuration.js") {
//             experiment_name = path_elements[path_elements.length - 2];
//             return new Code_Request(experiment_name);
//         } else {
//         }
//     } else if (path_elements.length==4) {
//         return new Experiment_Request(last_element());
//     } else {
//         return new Error_Request(path_elements[path_elements.length - 1])
//
//     }
//
//     return new Error_Request("Invalid Call");
//
// }
//
// const port = 8088;
// const bodyParser = require('body-parser');
//
// let this_protocol = http;
//
// if (process.argv.length == 0 || process.argv[0]=="http")
//     this_protocol = http;
//
// if (process.argv.length == 1 || process.argv[0]=="https")
//     this_protocol = http;
//
// const app = express();
//
// app.use( express.urlencoded({
//     extended: true,
//     parameterLimit: 2,
//     limit: '2mb',
// }));
//
// let server;
//
// if (process.argv.length == 1 || process.argv[0] == "https")
//     this_protocol = https;
// else
//     this_protocol = http;
//
// if (this_protocol==https) {
//     let key = fs.readFileSync('./ssl/server.key');
//     let cert = fs.readFileSync('./ssl/server.cert');
//
//     let options = {
//         key: key,
//         cert: cert
//     };
//     server = https.createServer(options, app);
// } else {
//     server= http.createServer(app);
// }
//
// app.get('/experimentation/experiment/*', (req: IncomingMessage, res: ServerResponse) => {
//     let software_science_request:Experiment_Request = get_software_science_request(req);
//     software_science_request.do_action(res);
// })
//
// app.post('/experimentation/upload/', (req, res) => {
//     // let  experiment_name = req.body.experiment_name;
//     // let  experiment_data = req.body.experiment_data;
//     //
//
//     // console.log('Someone sent something for ' + experiment_name);
//     console.log('with data: ' + req.body);
//     res.send('');
// })
//
// server.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
