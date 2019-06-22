// import * as hdf5 from './jsfive/index';

//Create a Pixi Application
let app = new PIXI.Application({width: 256, height: 256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// read the dataset
// data_url = 'http://localhost:8080/data/LLD-icon/LLD-icon_data_0.npy'
const data_urls = [
  'http://localhost:8080/data/LLD-icon/LLD-icon_data_0.npy',
  'http://localhost:8080/data/LLD-icon/LLD-icon_data_1.npy',
  'http://localhost:8080/data/LLD-icon/LLD-icon_data_2.npy',
  'http://localhost:8080/data/LLD-icon/LLD-icon_data_3.npy',
  'http://localhost:8080/data/LLD-icon/LLD-icon_data_4.npy',
]

console.log('Started loading data');

let data = [];
// not a const because it's set to undefined to free memory later

let total_length = 0;
for (url of data_urls) {
  NumpyLoader.ajax(url, (loaded_data) => {
    console.log('Finished loading data');
    data.push(loaded_data);
    console.log(loaded_data);
    total_length += loaded_data.data.length;
    f();
  });
}

const finished_loading = () => {
  let all_data = new Uint8Array(total_length);
  let all_data_index = 0;
  for (each_data of data) {
    all_data.set(each_data.data, all_data_index);
    all_data_index += each_data.data.length;
    console.log('setted data up to ', all_data_index);
  }
  // free up the memory
  data = undefined

  // store the final data
  window.data = all_data;
};

let counter = 0;
const f = () => {
  counter++;
  if (counter === data_urls.length) {
    console.log(data);
    finished_loading();
  }
}




/* Import hdf5 dataset straight up. Probably bad idea though
fetch(file_url) // the hdf5 file
 .then(function(response) {
   return response.arrayBuffer()
 })
 .then(function(buffer) {
   var f = new hdf5.File(buffer, filename);
   // do something with f;
   // let g = f.get('group');
   // let d = f.get('group/dataset');
   // let v = d.value;
   // let a = d.attrs;
 });
 */
