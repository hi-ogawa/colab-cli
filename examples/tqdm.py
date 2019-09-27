from time import sleep
from tqdm import tqdm

print('tqdm: start')
sleep(1) # not to overwrap with tqdm call

for _ in tqdm(range(5)):
  sleep(1)

print('tqdm: finished')
