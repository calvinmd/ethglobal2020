# ETHOnline Hackathon 2020

Official Project Link: https://hack.ethglobal.co/showcase/molecule-protocol-reckjQfzFXVAf0Umz

Deck: https://docs.google.com/presentation/d/1kPctfT0A0zpvlJBKxYoHgF3rjXykmRIwRRK2lqo14W0/edit?usp=sharing


# Molecule Protocol

## Short Description

If each token is an atom, and a combination of tokens will form a molecule, which can enable methods on a wallet. For example, only if a wallet contains a KYC token the transfer can be executed.

## Long Description

While DeFi is all about permission-less and censorship-resistant finance, it could nonetheless handle the regulation and compliance requirements, too. I started thinking how can a transfer of ERC20 or ERC721 token be subjected to KYC constrain.

I have looked at the existing standards such as the security token standard (ERC1400), the composable token standard (ERC998) and the Set Protocol for inspirations. While these are either designed to satisfy the constraints or can be modified to do so, they require launching new tokens or sticking to a rigid framework.

I want to create a simple smart contract that handles transfer of ERC20 and/or ERC721 tokens only if certain constraints are met for both the sender and recipient.

For example, to enforce a KYC requirement, a smart contract can be deployed that checks for the existence of an ERC721 KYC token from a whitelisted ERC721 contract address before approving or completing the transfer.

An arbitrarily combination of ERC20 (with quantity as an optional param) and/or ERC721 (with tokenId as an optional param) can be defined before a transfer can be executed.

## How It's Made

After poking around, I realize that the implementation is a combination of a DEX and a Marketplace smart contract—DEX being the edge case where the tokens involved are ERC20s only; in all other cases, it is essentially a (modified) marketplace. Since DEX is already well-implemented, the focus on this development is to create a modified marketplace smart contract to achieve the Molecule composition functionalities.

Then I started thinking what modification is needed in order for this to support the "molecule" structure in a marketplace—I realized that the only process I need to take is to create a whitelisting plug-in, to any existing marketplace, to enable the (molecule-structure) permission check, and for each combination of the molecules, developers should be able to customize with their own "plug-ins" smart contracts, too.

The smaller this protocol is, the more it can fit into the composable format, the more useful it would be. With that in mind, I **reduced this project to the scope of generating a "whitelist approver" smart contract**.

In addition to marketplaces, this can also be integrated with existing DEX, such as Uniswap, to allow KYC whitelisting before transactions are permitted. It can also be connected to a slightly modified Opensea, to enable collections (similar to composable ERC998) but without messing with the original tokens, and by allowing combination of tokens to be specified (as the molecule structure), it can also achieve some of the Set Protocol functionalities (very tiny part of it, just the token combination portion).

**What's Next?**

- **Add a signature block that users need to sign with their private keys to record the terms and conditions on chain as part of the transaction. In case of disputes, users can decrypt their agreement and submit as evidence.**
- Create a contract creation factory that allows inputs for multiple ERC721 combinations
- Add support for metadata verification in ERC721 tokens
- Modify the structure so the whitelist conditions can be **checked at the time of transfer** (some use cases may require that check at the time of transaction, not before)
- Add support for multiple currency combination in Uniswap and Opensea so we can support ERC20 combinations on the DEX/Exchange level, instead of delegating that to whitelist approver. (TBD, can't think of any real world use cases yet, but that completes the multi-ERC20 support).
- Modify and **create a compliant version of Uniswap and Opensea** smart contracts to support the Molecule Protocol—essentially, added an enforcement of whitelist checks.
- Create a marketplace smart contract that has the Molecule protocol built-in, meaning, users can list the "molecule structure" when listing.
