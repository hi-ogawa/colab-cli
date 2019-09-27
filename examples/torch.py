import torch

print(torch.__version__)
print(torch._C._show_config())

t = torch.randn(1000, 1000, device='cuda')
print(t)
print((t @ t).sum())
