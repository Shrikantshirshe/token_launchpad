//! SEP-41 compliant fungible token contract.
//!
//! Implements the full token interface: mint, burn, transfer, approve,
//! transfer_from, allowance, balance, decimals, name, symbol, total_supply.

#![no_std]

mod admin;
mod allowance;
mod balance;
pub mod contract;
mod event;
mod metadata;
mod storage_types;

pub use contract::TokenClient;

#[cfg(feature = "testutils")]
pub use contract::Token;

#[cfg(test)]
mod test;
