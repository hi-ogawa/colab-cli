import torch

print(torch.__version__)
print(torch._C._show_config())

t = torch.arange(2**20, dtype=torch.float, device='cuda').view(2**10, 2**10)
print(t)
print((t @ t).sum())
