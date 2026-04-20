#![cfg(test)]

use super::*;
use contract::{Token, TokenClient};
use soroban_sdk::{testutils::Address as _, Address, Env, String};

fn create_token<'a>(e: &Env, admin: &Address) -> TokenClient<'a> {
    let token = TokenClient::new(e, &e.register(Token, ()));
    token.initialize(
        admin,
        &7u32,
        &String::from_str(e, "Test Token"),
        &String::from_str(e, "TST"),
    );
    token
}

#[test]
fn test_initialize() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let token = create_token(&e, &admin);

    assert_eq!(token.decimals(), 7);
    assert_eq!(token.name(), String::from_str(&e, "Test Token"));
    assert_eq!(token.symbol(), String::from_str(&e, "TST"));
    assert_eq!(token.total_supply(), 0);
    assert_eq!(token.admin(), admin);
}

#[test]
fn test_mint_and_balance() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let user = Address::generate(&e);
    let token = create_token(&e, &admin);

    token.mint(&user, &1_000_0000000);
    assert_eq!(token.balance(&user), 1_000_0000000);
    assert_eq!(token.total_supply(), 1_000_0000000);
}

#[test]
fn test_transfer() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let alice = Address::generate(&e);
    let bob = Address::generate(&e);
    let token = create_token(&e, &admin);

    token.mint(&alice, &500_0000000);
    token.transfer(&alice, &bob, &200_0000000);

    assert_eq!(token.balance(&alice), 300_0000000);
    assert_eq!(token.balance(&bob), 200_0000000);
}

#[test]
fn test_approve_and_transfer_from() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let alice = Address::generate(&e);
    let bob = Address::generate(&e);
    let spender = Address::generate(&e);
    let token = create_token(&e, &admin);

    token.mint(&alice, &1000_0000000);
    token.approve(&alice, &spender, &300_0000000, &200);
    assert_eq!(token.allowance(&alice, &spender), 300_0000000);

    token.transfer_from(&spender, &alice, &bob, &100_0000000);
    assert_eq!(token.balance(&alice), 900_0000000);
    assert_eq!(token.balance(&bob), 100_0000000);
    assert_eq!(token.allowance(&alice, &spender), 200_0000000);
}

#[test]
fn test_burn() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let user = Address::generate(&e);
    let token = create_token(&e, &admin);

    token.mint(&user, &1000_0000000);
    token.burn(&user, &400_0000000);

    assert_eq!(token.balance(&user), 600_0000000);
    assert_eq!(token.total_supply(), 600_0000000);
}

#[test]
fn test_set_admin() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let new_admin = Address::generate(&e);
    let token = create_token(&e, &admin);

    token.set_admin(&new_admin);
    assert_eq!(token.admin(), new_admin);
}

#[test]
#[should_panic(expected = "already initialized")]
fn test_double_initialize_panics() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let token = create_token(&e, &admin);
    token.initialize(
        &admin,
        &7u32,
        &String::from_str(&e, "Dup"),
        &String::from_str(&e, "DUP"),
    );
}

#[test]
#[should_panic(expected = "insufficient balance")]
fn test_transfer_insufficient_balance() {
    let e = Env::default();
    e.mock_all_auths();
    let admin = Address::generate(&e);
    let alice = Address::generate(&e);
    let bob = Address::generate(&e);
    let token = create_token(&e, &admin);

    token.mint(&alice, &100_0000000);
    token.transfer(&alice, &bob, &200_0000000);
}
