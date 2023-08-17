# Tecnologías

## SSI Framework

Con la Identidad Auto-Soberana (en Inglés Self-Sovereign Identity (SSI)), los titulares de la identidad individual crean y controlan completamente sus credenciales, sin verse obligados a solicitar autorización de una autoridad intermediaria o centralizada y les da control sobre cómo se comparten y usan sus datos personales.

El usuario tiene un medio para generar y controlar identificadores únicos, así como alguna facilidad para almacenar datos de identidad.

Los Identificadores Descentralizados (Decentralised IDs o DIDs) y las Credenciales Verificables (Verified Credencials o VCs) son los pilares del modelo Self-sovereign identity (SSI).


### DID

Los identificadores descentralizados (DID) son un nuevo tipo de identificador que permite una identidad digital verificable y descentralizada. 
Un DID se refiere a cualquier sujeto (por ejemplo, una persona, organización, cosa, modelo de datos, entidad abstracta, etc.) según lo determine el controlador del DID. 

[W3C - Specification](https://www.w3.org/TR/did-core/)


### Credencial Verificable

Una credencial verificable es una solución, que permite contrastar quién ha emitido una información, y cuándo.
El objetivo fundamental del estándar de Credenciales Verificables es habilitar el equivalente digital de las credenciales físicas que almacenamos en nuestras billeteras físicas y que utilizamos en el día a día para proporcionar prueba de nuestra identidad y/o de nuestros atributos.


#### Presentación de una Credencial Verificable

Los titulares de credenciales verificables pueden generar presentaciones verificables y luego compartir estas presentaciones verificables con los verificadores para demostrar que poseen credenciales verificables con ciertas características.

Las presentaciones son datos derivados de una o más credenciales verificables, emitidas por uno o más emisores, que se comparten con un verificador específico. Una presentación verificable es una presentación a prueba de manipulaciones codificada de tal manera que se puede confiar en la autoría de los datos después de un proceso de verificación criptográfica. 

Ciertos tipos de presentaciones verificables pueden contener datos que se sintetizan a partir de las credenciales verificables originales, pero que no las contienen por ejemplo:

* Pruebas de conocimiento cero
* Selective Disclosure




#### Atributos

#### Context

Define las propiedades e información que contiene la VC.

#### Type

Tipo de credencial.
VerifiableCredential por default.
Y adicionalmente EmploymentCredential para nuestro caso de uso.


#### Issuer

Emisor de la VC.
Es identificado a través de un DID.

#### Credencial Subject

Información que refiere al holder de la VC.

#### Proof

Firmas generadas por el Issuer al crear la VC.

Se corroboran con las claves publicas de un VerificationMethod.


#### Ejemplo de Credencial Verificable

(JSON-LD)
```json
{

  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "http://example.edu/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": {
      "id": "did:example:c276e12ec21ebfeb1f712ebc6f1",
      "name": [{
        "value": "Example University",
        "lang": "en"
      }, {
        "value": "Exemple d'Université",
        "lang": "fr"
      }]
    }
  },
  "proof": {
    "type": "RsaSignature2018",
    "created": "2017-06-18T21:19:10Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://example.edu/issuers/565049#key-1",
    "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5X
      sITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUc
      X16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtj
      PAYuNzVBAh4vGHSrQyHUdBBPM"
  }
}
```


### Referencias

[Wikipedia](https://en.wikipedia.org/wiki/Self-sovereign_identity)

[Verifiable Credentials powered by Auth0](https://verifiablecredentials.dev/)

[19 FAQs on Verifiable Credentials and Self-Sovereign Identity](https://academy.affinidi.com/faqs-on-verifiable-credentials-and-self-sovereign-identity-3c3a505878bc)

[Okta - Autonomous Identity Management](https://www.okta.com/identity-101/self-sovereign-identity/)

[Trust Over IP - SSI Interactive model](https://trustoverip.org/toip-model/)


## QuarkID

Modelo de implementación de SSI.
Ofrece una wallet app para la administración de credenciales verificables.
Tiene partnership con el GCBA, lo propone como actor clave del modelo.

[Sitio web](https://quarkid.org/)
[Whitepaper](https://github.com/Quark-id/WhitePaper)


## World App (Worldcoin)

Worldcoin aims to establish universal access to the global economy regardless of country or background. It is designed to become the world's largest human identity and financial network, giving ownership to everyone. All with the intention of welcoming every person on the planet and establishing a place for all of us to benefit in the age of AI.

[Sitio web](https://worldcoin.org/)
[Worldcoin Developer Portal](https://developer.worldcoin.org/login)


# Data model

## User

```ts
type User = {
  id: string;
  did: string;
  worldId: string;
}
```


## UserPreferences

```ts
type User = {
  id: string;
  subscribedToNotifications: boolean;
  subscribedToInfoRequest: boolean;
}
```


## Employee

```ts
type Employee = {
  id: string;
  userId: string;
  taxId: string; // CUIT
  givenName: string;
  familyName: string;
  birthDate: Date;
  email: string;
  telephone: string;
  nationality: string;
}
```


## VerifiableCredential

[W3C Specification](https://www.w3.org/TR/vc-data-model-2.0/)

```ts
type VerifiableCredential = {
  subjectDid: string;
  type: string;
  context: string[];
  issuer: string;
  proof: string;
}
```

### Contexts

(EmployeeRole)[https://schema.org/EmployeeRole]
(Person)[https://schema.org/Person]


## Company

```ts
type Company = {
  id: string;
  did: string;
  walletAddress: string;
  name: string;
  email: string;
  telephone: string;
  country: string;
}
```


## InfoRequest

```ts
type InfoRequest = {
  id: string;
  companyId: string;
  status: string;
  txHash: string;
  amount: number;
  balance: number;
}
```


## InfoRequestAcceptance

```ts
type InfoRequestAcceptance = {
  id: string;
  employeeId: string;
  infoRequestId: string;
  status: string;
  txHash: string;
  amount: number;
}
```


# Flujos

### Emisión de VC


(VCSuite: Create Credential)[https://docs.extrimian.com/es/vc-suite/spec#creaci%C3%B3n]

(Ejemplo happy path)[https://github.com/extrimian/ssi-quickstart/blob/master/stage3/vc-example/src/examples/1.sign-vcservice-ok.ts]



### Verificación de VC

Se hace a través un de una "presentación verificable".

En esta presentación el Owner agrega firmas de sus propios proofs.
También especifica un Verification Method del subject, desde donde se puede obtener las claves publicas para verificar ownership.

El flujo comienza escaneando un código QR generado por la entidad que desea verificar.
Interviene el protocolo WACI (intercambio de credenciales).

