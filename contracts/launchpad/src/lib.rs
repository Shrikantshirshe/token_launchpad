//! Token Launchpad contract.
//!
//! Orchestrates token deployments via inter-contract calls to the Token contract.
//! Tracks all launched tokens, their metadata, and creator information.

#![no_std]

mod contract;
mod storage_types;
mod event;

pub use contract::LaunchpadClient;

#[cfg(test)]
mod test;
