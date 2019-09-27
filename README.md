Colab CLI

Usage

```
# Setup
$ yarn install # or npm install

# Login to Google (data will be saved at `./userDataDir`)
$ node login.js

# Run examples/torch.py on Colab
$ PYFILE=examples/torch.py COLAB_URL=https://colab.research.google.com/drive/1PAyWisnzGCzDadGPKAj275gQTcmipJUa node run.js
:: Launching a browser...
:: Navigating to https://colab.research.google.com/drive/1PAyWisnzGCzDadGPKAj275gQTcmipJUa ...
:: Colab opened
:: - URL: https://colab.research.google.com/drive/1PAyWisnzGCzDadGPKAj275gQTcmipJUa
:: - Name: colab-cli
:: Setting up Runtime (GPU)...
Connected to "Python 3 Google Compute Engine backend (GPU)"
:: Running a program...
Run cell (Ctrl+Enter) cell executed since last change  executed by Hiroshi Ogawa 1:53 AM (0 minutes ago) executed in 8.004s
:: Program output:
1.1.0
PyTorch built with:
  - GCC 4.9
  - Intel(R) Math Kernel Library Version 2018.0.1 Product Build 20171007 for Intel(R) 64 architecture applications
  - Intel(R) MKL-DNN v0.18.1 (Git Hash 7de7e5d02bf687f971e7668963649728356e0c20)
  - OpenMP 201307 (a.k.a. OpenMP 4.0)
  - NNPACK is enabled
  - CUDA Runtime 10.0
  - NVCC architecture flags: -gencode;arch=compute_35,code=sm_35;-gencode;arch=compute_50,code=sm_50;-gencode;arch=compute_60,code=sm_60;-gencode;arch=compute_61,code=sm_61;-gencode;arch=compute_70,code=sm_70;-gencode;arch=compute_75,code=sm_75;-gencode;arch=compute_50,code=compute_50
  - CuDNN 7.5.1
  - Magma 2.5.0
  - Build settings: BLAS=MKL, BUILD_TYPE=Release, CXX_FLAGS=  -Wno-deprecated -fvisibility-inlines-hidden -fopenmp -O2 -fPIC -Wno-narrowing -Wall -Wextra -Wno-missing-field-initializers -Wno-type-limits -Wno-array-bounds -Wno-unknown-pragmas -Wno-sign-compare -Wno-unused-parameter -Wno-unused-variable -Wno-unused-function -Wno-unused-result -Wno-strict-overflow -Wno-strict-aliasing -Wno-error=deprecated-declarations -Wno-error=pedantic -Wno-error=redundant-decls -Wno-error=old-style-cast -Wno-unused-but-set-variable -Wno-maybe-uninitialized -fno-math-errno -fno-trapping-math, DISABLE_NUMA=1, PERF_WITH_AVX=1, PERF_WITH_AVX2=1, USE_CUDA=True, USE_EXCEPTION_PTR=1, USE_GFLAGS=OFF, USE_GLOG=OFF, USE_MKL=ON, USE_MKLDNN=ON, USE_MPI=OFF, USE_NCCL=True, USE_NNPACK=True, USE_OPENMP=ON,

tensor([[ 7.3587e-01, -1.6575e+00,  1.7276e+00,  ...,  2.8154e-01,
          1.0188e+00,  1.2191e+00],
        [ 1.0947e+00,  5.2347e-01, -1.1042e-03,  ...,  5.6871e-01,
          2.6982e+00, -5.2176e-01],
        [-7.2947e-01, -7.3047e-01,  1.0790e+00,  ...,  7.7748e-01,
          8.0735e-01, -1.3832e+00],
        ...,
        [-1.3098e-02,  5.6411e-01, -5.1865e-02,  ...,  1.0724e+00,
          1.0393e+00, -3.8762e-01],
        [-7.1979e-03, -1.5841e+00, -1.9995e+00,  ...,  5.3845e-01,
         -9.1445e-01,  2.1605e-01],
        [ 3.2658e-01,  1.8305e-01, -7.2205e-01,  ..., -3.3324e-01,
          1.6185e+00,  3.7398e-01]], device='cuda:0')
tensor(-2267.4375, device='cuda:0')

:: Saving notebook...
:: Saved.
:: Closing browser...
:: Closed.
```


Tips

```
# Play with puppeteer from console (with "await-able" REPL)
$ node --experimental-repl-await console.js

# Stop "crash restore prompt" on startup (cf. https://superuser.com/questions/1343290/disable-chrome-session-restore-popup)
$ perl -pi -e 's/Crashed/Normal/' ./userDataDir/Default/Preferences
```


References

- https://chromedevtools.github.io/devtools-protocol/
- https://github.com/GoogleChrome/puppeteer
