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
