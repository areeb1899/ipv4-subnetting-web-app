export function calculateSubnetDetails(ipArray, cidr) {
  const ip = ipArrayToNumber(ipArray);
  const mask = cidrToMask(cidr);
  const subnet = ip & mask;
  const broadcast = subnet | ~mask >>> 0;
  const firstHost = cidr === 32 ? subnet : subnet + 1;
  const lastHost = cidr >= 31 ? broadcast : broadcast - 1;
  const nextSubnet = broadcast + 1;

  return {
    Network: numberToIpArray(subnet),
    Broadcast: numberToIpArray(broadcast),
    'First Host': numberToIpArray(firstHost),
    'Last Host': numberToIpArray(lastHost),
    'Next Subnet': numberToIpArray(nextSubnet)
  };
}

function ipArrayToNumber(arr) {
  return (
    (arr[0] << 24) |
    (arr[1] << 16) |
    (arr[2] << 8) |
    arr[3]
  ) >>> 0;
}

function numberToIpArray(num) {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ];
}

function cidrToMask(cidr) {
  return (0xffffffff << (32 - cidr)) >>> 0;
}
