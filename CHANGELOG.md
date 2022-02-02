## [0.25.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.25.0...0.25.1) (2022-02-02)


### Bug Fixes

* **iam:** fetch project IAM policy via API ([7763012](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/7763012c48d38a8c01faa9a3e47fa2169cd389f3))

# [0.25.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.24.1...0.25.0) (2022-02-02)


### Features

* rename kms service to kmsKeyRing ([64b2b5d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/64b2b5d93f6252fd02aaccea02475895a906a352))
* **service:** Add kmsCryptoKey service ([ac555f3](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/ac555f38f05370d396041c8360c844478145189b))

## [0.24.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.24.0...0.24.1) (2022-02-01)


### Bug Fixes

* Cleaned up relations file ([2463c12](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/2463c12ae5d25106842a01269437c1f4947f098b))
* Fixed issue reusing logBucket data from logView ([df0acc2](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/df0acc24f61fd7218738c1a8f7387e0ed734c93c))
* Fixed issues with folder list data method ([f959657](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f959657cedadd997ad27f51862f58cf7623b23ad))
* Updated references for common utils ([2f5a7d0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/2f5a7d0c8167f2f9227052929670a1a5ca6d37f7))

# [0.24.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.23.0...0.24.0) (2022-02-01)


### Bug Fixes

* **iamPolicy:** fetch resources if not present ([c133733](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/c1337337e72efaaf1d0dfb30d34d63a6d6009e7e))


### Features

* **iamPolicy:** add storage bucket policies ([f5bc680](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f5bc6809423964ef9c1fe25c5cb620cb620623f1))

# [0.23.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.22.1...0.23.0) (2022-01-31)


### Features

* **computeProject:** add compute project service ([1b13ef2](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/1b13ef28bf81983ab4fbbc1872c0a61b04eb7b26))

## [0.22.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.22.0...0.22.1) (2022-01-27)


### Bug Fixes

* **services:** fix folder service where no orgs are present ([5c9dcc2](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5c9dcc22f29f48d72b7a14b48b7ec96f70ec5a88))

# [0.22.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.21.0...0.22.0) (2022-01-27)


### Features

* **apiKeys:** add api keys service ([87d6206](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/87d620638d5f57e9762dcb78e31e003e6a8ce56d))

# [0.21.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.20.1...0.21.0) (2022-01-25)


### Features

* **service:** Add IAM Policy connection to folder services ([5960c2e](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5960c2ec3ab329fd134d93618027ca5ff1939888))

## [0.20.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.20.0...0.20.1) (2022-01-25)


### Bug Fixes

* **vpcConnectors:** update vpc service name ([0ebb7ac](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/0ebb7ac992cc51d3e71b0295ac022b18e02576fb))

# [0.20.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.19.0...0.20.0) (2022-01-24)


### Features

* Added connection to project ([ced96f9](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/ced96f9f0a881cfaa3773e96539e654d44ed5a60))
* Created service account ([4aece95](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/4aece953922828459ddd34167a1824fafacf8071))

# [0.19.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.18.0...0.19.0) (2022-01-24)


### Bug Fixes

* **sslPolicies:** list name policy ([39e258d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/39e258d399e6dce3dee96a0661fbf3d2abb1edef))


### Features

* **sslPolicies:** add ssl policies service ([8a3da19](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/8a3da19d8f9514636d435659abb21467521514e8))

# [0.18.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.17.0...0.18.0) (2022-01-24)


### Bug Fixes

* **firewall:** add network list raw data ([d238d6a](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/d238d6a25d035633b1060badc56eb46563ce53b3))


### Features

* **sqlInstances:** add sql instances service ([10eb990](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/10eb9907d2f4ca6a499718cc16e15bf80fdbe35b))

# [0.17.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.16.0...0.17.0) (2022-01-21)


### Bug Fixes

* **targetHttpsProxies:** service name pluralize ([cc89324](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/cc89324ae4e36ffe77901c70492cfacbac654bf2))
* **targetHttpsProxy:** rebase conflict ([54170d3](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/54170d3ec284df53b809cc56a58d833742bfa771))


### Features

* **targetHttpsProxy:** add targetHttpsProxy service ([18ca770](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/18ca770c4e4be44a4b0d861796899618b51d037c))

# [0.16.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.15.0...0.16.0) (2022-01-20)


### Bug Fixes

* **targetSslProxies:** service name pluralize ([76387f6](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/76387f62c83ac31d1741f2c21890b31a66800c20))
* **targetSslProxies:** update service name readme ([eb53741](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/eb53741312a7f0b39602cdbacbf9f46ba56f1e41))


### Features

* **targetSslProxy:** add targetSslProxy service ([b15faaf](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/b15faaf93133a5392c40b6498e5e6c0e422a0734))

# [0.15.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.14.1...0.15.0) (2022-01-20)


### Bug Fixes

* **assetInventory:** combine format util imports ([cf81e74](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/cf81e74b0d3b3dab7198137e0f7b9e29256a4cc9))
* **assetInventory:** drop top level spreads in format ([3b4ad13](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/3b4ad13a7b2aa081d80f320eecd71f6359a5dfbf))
* **assetInventory:** remove empty override ([ebc5b33](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/ebc5b33be02527a3cfa838903e148f9ac981ef29))
* **assets:** update service name for pluralization ([99101e4](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/99101e4f7e5116c7533d190d6976ceea25f221dd))


### Features

* **assetInventory:** added asset inventory service ([f06d43f](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f06d43f2d2dff57cb3803e1e6b37d80edcfe4393))

## [0.14.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.14.0...0.14.1) (2022-01-19)


### Bug Fixes

* Added missing storageBucket service to schemaMap ([4751db6](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/4751db616a11431a769cd21fb1d691e375a57157))
* Preserved policy packs setting during init command ([23cf4dc](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/23cf4dc2c0c39e31d10aea9b7044654951b824f7))

# [0.14.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.13.1...0.14.0) (2022-01-18)


### Bug Fixes

* **cloudFunction:** add vpc connection, drop network connection ([5bda459](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5bda459942431ff2f923c04d5e98bdc132d16e1b))
* **cloudFunction:** update connections in readme ([d3a2a6d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/d3a2a6d59ba7fbab57cb5d34f1409a0e645a5de3))


### Features

* **cloudFunction:** add cloud function service ([b5d12d7](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/b5d12d7d4548692969afed267d39e487eca46e22))

## [0.13.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.13.0...0.13.1) (2022-01-18)


### Bug Fixes

* **vmInstance:** add network interfaces ([b7d28d5](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/b7d28d518d694f7040708bff95e1e1a639391e39))

# [0.13.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.12.0...0.13.0) (2022-01-14)


### Features

* **alertPolicy:** add alert policy service ([4bb86bc](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/4bb86bc8e7de36cbcb385b352803247eceaa959e))

# [0.12.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.11.1...0.12.0) (2022-01-13)


### Features

* **logMetric:** add logMetric service ([d9659db](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/d9659dbce2da19383fad9e5a3865ec28708788aa))

## [0.11.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.11.0...0.11.1) (2022-01-12)


### Bug Fixes

* name ([465855a](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/465855a3a1a44230f957cbe5dd1b42fa04915a76))
* name ([db06753](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/db06753e1ae714dd40467579b8cf61d5f204b7d1))

# [0.11.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.10.0...0.11.0) (2022-01-12)


### Bug Fixes

* **dns:** check error in response ([ecccff9](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/ecccff9bc7f467a829418e2c1a4dd5df6b0dddf1))
* **dnsPolicy:** add network connection ([dd8a7fe](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/dd8a7fec7cb058f8e04f2eb0bf634a1b443f0f05))


### Features

* **dns:** add dns policies ([15b5ade](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/15b5adeef19491b6b104ce63bc9f6130fb10229c))
* **dns:** add dns policies ([285f0f8](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/285f0f8c27428513db2bc07e2b0e52d9076d51c0))
* **dns:** add dns to relations ([9d1bb1d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/9d1bb1db85f99b9edc28928fbcea835e1c473ee3))
* **dns:** rebase main and updates ([b1374e4](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/b1374e4e5b1da8f00e2d155c17082e32968c30cb))
* **dns:** rebase main and updates ([387c10a](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/387c10af4d55862204720e18abefd9b4b8e9baaa))
* **dns zone:** add gcp dns zone ([084fd84](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/084fd846836a712bc6fb1dc1dc813ec82a31e5d3))
* **dns zone:** add gcp dns zone ([18e455d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/18e455d45e94a403cded83ddec8bfa55b32e8e79))
* **firewall:** add firewall service ([ade1a2a](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/ade1a2a556c6daaa9a290a29d595447a842f9846))
* **secretManager:** add secret manager service ([ec06ed5](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/ec06ed58a83314198dead3bb641dfb5f0967c075))

# [0.10.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.9.0...0.10.0) (2022-01-11)


### Features

* **vmInstance:** add VM Instance service ([a113a0c](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/a113a0c8b9708f8dea1531072ab9eede80ee40fa))

# [0.9.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.8.0...0.9.0) (2022-01-10)


### Bug Fixes

* **network:** add firewall connection, filter private fields ([852c788](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/852c78891acb14199f22ade79825227f536d3145))
* **network:** update readme with firewall connection ([58b66ff](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/58b66ff56067824c3c105ee014df76b953df1312))
* **subnet:** update flowSampling type ([62811a9](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/62811a960e481ac7a4c46d8543d03f0ec62c1dc0))


### Features

* **network:** add network/subnet services ([f827256](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f8272566db2a0602de2a37d4907a154625795b6d))

# [0.8.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.7.0...0.8.0) (2022-01-07)


### Features

* **secretManager:** add secret manager service ([f297f92](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f297f928a9125e7c7973bfdd142a1e79b02465a7))

# [0.7.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.6.1...0.7.0) (2022-01-07)


### Features

* **resourceManager:** add folder/organization services ([f81cc25](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f81cc25d94aa3024a1cae8e919a8d4027ea5be82))

## [0.6.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.6.0...0.6.1) (2022-01-06)


### Bug Fixes

* **credentials:** update phrasing for key file input ([5da5594](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5da55949e4768f7beba5657d4a6ca19d811e531a))
* **enums:** drop unused resources file ([5d884d5](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5d884d50d2438dc24b22e1f8e7036dfa361aaf8d))

# [0.6.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.5.0...0.6.0) (2022-01-05)


### Bug Fixes

* **firewall:** add region ([b5283b9](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/b5283b9ba55dc7c1cb99b57c76384d616f8be376))
* **firewall:** drop account arg in format ([4de83a1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/4de83a1e3d25bfa8b8cd5737cc5758fb5c056deb))


### Features

* **firewall:** add firewall service ([fa320ff](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/fa320ff88babf73058bd41f135c38879196da34f))

# [0.5.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.4.0...0.5.0) (2022-01-03)


### Features

* **storageBucket:** add storage bucket service ([b7abdab](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/b7abdab2b1b3982c0149e36980bad733d1c4d73b))

# [0.4.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.3.0...0.4.0) (2021-12-29)


### Features

* **cg-430:** add gcp kms ([398ceeb](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/398ceeb42bff3ddaa106e293b21b908f70eca419))
* **kms:** kms <-> project connection updates ([eddb916](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/eddb916425081ce214d75fb7d46e64eb8a2c16ab))
* **kms:** merge main ([89ccb8d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/89ccb8d59e9de3eee67822ea9e88c8b811194777))
* **kms:** remove tag/label ([f57a34a](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/f57a34a6e46873fb185a3d142e84fe5431a15fb4))
* **kms:** small fixes ([d23beec](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/d23beece2bf60b0f0004103f5268f579b722f0dd))
* **kms:** update labels ([6a865f3](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/6a865f313442148b3cf503c932ccb6995f62be40))

# [0.3.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.2.1...0.3.0) (2021-12-28)


### Bug Fixes

* **logging:** add projectId on logSink ([6bb4d95](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/6bb4d95fc7e67b0fa73296d2836a43bb0cd7f392))
* **logging:** update log view service name ([cfa0200](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/cfa020014f606e8e12517c2d52ecfa93d5d7ee50))


### Features

* **logging:** add logging services, update project connections ([a30c93d](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/a30c93d712bb75ecdc6dd456416c1280cedc13a5))

## [0.2.1](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.2.0...0.2.1) (2021-12-27)


### Bug Fixes

* change Tag type naming to gcpRawTag ([5b77c85](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5b77c85ac1836fe10d17ac669013316e2dd0a4ca))

# [0.2.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.1.0...0.2.0) (2021-12-21)


### Bug Fixes

* **iam:** log found policies ([1efc1fa](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/1efc1fae362e42a85b80f5ba5a40724c6d54f9d0))
* **iam:** remove unused import ([6ef1970](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/6ef19703bc9967ba06755d1f285a32ebcc009104))
* **iam:** restrict resources for iam ([afd15dd](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/afd15ddc094c8ad5f6448256b5a3db2c3c4ea543))


### Features

* **iam:** add iam service/initial connections ([4c7bdbc](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/4c7bdbc52458ab24e1ca334b872b0ced89cd088c))

# [0.1.0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/compare/0.0.0...0.1.0) (2021-12-15)


### Bug Fixes

* **config:** update configure signature, get flags via config instance ([2935409](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/2935409471c8085fc32aa4b178466a64a2e2579d))
* **enums:** remove global region ([8ae5d4f](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/8ae5d4fb6eb06a2aee688adad60bdbf5eecff306))
* **project:** set labels default ([315aedf](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/315aedfa46462f6d1af46f169017a5ae6cf8f3b0))
* **readme:** update config example ([60ef5f9](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/60ef5f929c173e741b62ec5fc7d4fa69931a6041))
* **services:** comment unsupported services ([5adea10](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5adea1036359d5c0e464ca30751956bce29d9fd1))
* **utils:** add enum key to string util ([5202fd0](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/5202fd0c50c7857a9fae5a99cf8e58542f485a8a))


### Features

* add boilerplate, enums, utils ([c1c5ada](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/c1c5adadd2269dd3ff4f9ef40edb7b0532710c43))
* add projects/vpc service ([16e886e](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/16e886eec62978b633d12b672ef8033dfe54b6c1))
* add utils, enums and properties ([2e029cf](https://gitlab.com/auto-cloud/cloudgraph/provider/cloudgraph-provider-gcp/commit/2e029cfc312d04f4bb56e05200b9a4758c2964f2))
