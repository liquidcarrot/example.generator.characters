
class ImageDataset {
  constructor() {
    const root = 'http://localhost:8080/';
    this.data_urls = [
      root + 'data/LLD-icon/LLD-icon_data_0.npy',
      // root + 'data/LLD-icon/LLD-icon_data_1.npy',
      // 'http://localhost:8080/data/LLD-icon/LLD-icon_data_2.npy',
      // 'http://localhost:8080/data/LLD-icon/LLD-icon_data_3.npy',
      // 'http://localhost:8080/data/LLD-icon/LLD-icon_data_4.npy',
    ];
    this.dataset = null; // stores the data after loading it
  }

  loadImages(callback) {
    let data = [];
    // not a const because it's set to undefined to free memory later

    let total_length = 0;
    for (const url of this.data_urls) {
      NumpyLoader.ajax(url, (loaded_data) => {
        console.log(loaded_data);
        data.push(loaded_data);
        total_length += loaded_data.data.length;

        // to be used by the get[Property] functions
        this.image_width = loaded_data.shape[1];
        this.image_height = loaded_data.shape[2];
        this._image_channels = loaded_data.shape[3];

        loaded();
      });
    }

    const finished_loading = () => {
      let all_data = new Uint8Array(total_length);
      let all_data_index = 0;
      for (const each_data of data) {
        all_data.set(each_data.data, all_data_index);
        all_data_index += each_data.data.length;
        //console.log('setted data up to ', all_data_index);
      }
      // free up the memory
      data = undefined

      // store the final data
      this.dataset = all_data;
      callback();
    };

    // just checks if we have downloaded all the datasets requested
    let counter = 0;
    const loaded = () => {
      console.log('Loaded part ', counter);
      counter++;
      if (counter === this.data_urls.length) {
        finished_loading();
      }
    }

  }

  getNumberOfImages() {
    const bytes_per_image = this.getImageWidth() * this.getImageHeight() * this._getImageChannels();
    // using the private version of _getImageChannels because the public one adds an alpha channel
    return this.dataset.length / bytes_per_image;
  }

  getImageWidth() {
    return this.image_width;
  }

  getImageHeight() {
    return this.image_height;
  }

  // e.g. rgb => 3 channels
  _getImageChannels() {
    return this._image_channels;
  }

  // returns the number of channels as seen by getImage, not the real number of channels internally
  getImageChannels() {
    return 4;
    // adds alpha
  }

  // returns the image number image_number
  // Adds an alpha channel for
  getImage(image_number) {
    const width = this.getImageWidth();
    const height = this.getImageHeight();
    const number_of_pixels = width * height;
    const bytes_per_image = 4 * number_of_pixels;
    const image_data = new Uint8ClampedArray(bytes_per_image);

    const start_index = image_number * number_of_pixels * 3; // inside there's no alpha channel

    // copy from dataset to image data
    copyWithAlpha(this.dataset, image_data, {start_index, number_of_pixels});

    return image_data;
  }

}

class Drawer {
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');
  }

  drawImage(uint8_clamped_array_image, width = 32, height = 32) {
    const image_data = new ImageData(uint8_clamped_array_image, width, height);
    //image_data.data = uint8_clamped_array_image;
    this.ctx.putImageData(image_data, 0, 0);
  }
}
