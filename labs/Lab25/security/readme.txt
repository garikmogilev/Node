private key Certification Authority
openssl genrsa -des3 -out CA-LAB25-SIA.key 2048

Certification Authority
openssl req -x509 -new -key CA-LAB25-SIA.key -days 700 -sha256 -out CA-LAB25-SIA.crt

private key for resource
openssl genrsa -des3 -out RS-LAB25-SIA.key 2048

certificate for request
openssl req -new -key RS-LAB25-SIA.key -out RS-SIA.csr -sha256 -config RS-LAB25-SIA.cfg

certificate for resource
openssl x509 -req -in RS-SIA.csr -CA CA-LAB25-SIA.crt -CAkey CA-LAB25-SIA.key -CAcreateserial -out RS-SIA-CRT.crt -days 365 -sha256 -extensions v3_req -extfile RS-LAB25-SIA.cfg