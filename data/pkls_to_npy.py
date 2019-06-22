'''
Convert a pkl file into json file
'''
import sys
import os
import _pickle as pickle
#import pickle
import json
import numpy as np


# deprecated
def convert_dict_to_json(file_path):
    target_file_path = '%s.npy' % file_path
#    with open(file_path, 'rb') as fpkl, open('%s.json' % file_path, 'w') as fjson:
    with open(file_path, 'rb') as fpkl, open(target_file_path, 'w') as fnpy:
        print("here 1")
        data = pickle.load(fpkl, encoding='latin1')# encoded in python 2 so latin1
        print("here 2")
        # so far the data could be read succesfully
        # pkl_as_list = data.tolist()
        # np.save(fnpy, data, allow_pickle=False)
        np.save(target_file_path, data, allow_pickle=False)
        print("here 3")
        # json.dump(pkl_as_list, fjson, ensure_ascii=False, sort_keys=True, indent=4)
        print("here 4")

# paths is an array of file urls
def convert_pkls_to_npy(file_paths, target_path):
    print('started converting')
    list_of_datas = [None for path in file_paths]
    i = 0
    for path in file_paths:
        with open(path, 'rb') as src_file:
            data = pickle.load(src_file, encoding='latin1')# encoded in python 2 so latin1
            list_of_datas[i] = data
            print('Loaded data ', i)
            i += 1

    data = np.concatenate(list_of_datas)
    print('concatenated')
    with open(target_path, 'w') as target_File:
        np.save(target_File, data, allow_pickle=False)
    print('saved')

def main():
    # this is not working because it's throwing mem error
    target_file = 'LLD-icon/LLD-icon_data.npy'
    dir = 'LLD-icon/'
    file_paths = ['LLD-icon_data_0.pkl','LLD-icon_data_1.pkl','LLD-icon_data_2.pkl','LLD-icon_data_3.pkl','LLD-icon_data_4.pkl']
    file_paths = [dir + path for path in file_paths]
    convert_pkls_to_npy(file_paths, target_file)
    # if sys.argv[1] and os.path.isfile(sys.argv[1]):
    #     file_path = sys.argv[1]
    #     print("Processing %s ..." % file_path)
    #     convert_dict_to_json(file_path)
    # else:
    #     print("Usage: %s abs_file_path" % (__file__))


if __name__ == '__main__':
    main()
