
function startApp() {
  images_dataset.loadImages(onLoad);
}

let iteration_counter = new Vue({
  el: '#iteration-counter',
  data: {
    iteration_number: 0,
  },
});

let app = new Vue({
  el: '#app',
  data: {
    loaded: false,
    previousImage,
    nextImage,
    startTraining,
    generateImage,
//    dicks: "blue"
  },
  /*
  methods: {
    changecolor() {
      this.dicks = "green";
    }
  }*/
});

let images_dataset = new ImageDataset();

let drawer_real;
let drawer_generated;
let db_index = 0;
function onLoad() {
  app.loaded = true;

  console.log('done');

  drawer_real = new Drawer('canvas-real-images');
  drawer_generated = new Drawer('canvas-generated-images');
  drawer_real.drawImage(images_dataset.getImage(db_index));
}

function previousImage() {
  db_index--;
  if (db_index < 0) {
    db_index = images_dataset.getNumberOfImages() - 1;
  }
  drawer_real.drawImage(images_dataset.getImage(db_index));
}

function nextImage() {
  db_index++;
  var num_imgs = images_dataset.getNumberOfImages();
  if (db_index >= num_imgs) {
    db_index = 0;
  }

  drawer_real.drawImage(images_dataset.getImage(db_index));
}

function startTraining() {
  // generator network:
  // 10 inputs (random numbers) -> 3072 outputs (32*32*3)
  // discriminator network:
  // 3072 inputs -> 1 output (how likely to be real)
  let generator_network = carrot.Network(10, 3072);
  let discriminator_network = carrot.Network(3072, 1);

  // generate some images using the random numbers
  

  // mix them between the real images

  // teach the discriminator network

  // repeat
}

function generateImage() {

}

startApp();


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
