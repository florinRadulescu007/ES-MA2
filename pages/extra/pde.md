# Partial differential equations

::: warning
The information in this section is being updated.
:::

There are a huge number of different types of partial differential equations (PDEs) and here we consider just two types, _first order linear PDEs_ and the _1D wave equation_. We start by consider an example of the first type.

Find all solutions of the PDE,
$$3 \tfrac{\partial f}{\partial x}(x,y) + 2 \tfrac{\partial f}{\partial y} (x,y) = 0.$$

The given PDE is equivalent to

$$
\left( \begin{smallmatrix}
            3 \\ 2
        \end{smallmatrix} \right)
    \cdot
    \nabla f(x,y) =0.
$$

We can also phrase this in terms of the directional derivative, namely

$$
D_{\mathbf{v}}f(x,y) = 0 \quad \text{where \(\mathbf{v}=\left( \begin{smallmatrix}
                3 \\ 2
            \end{smallmatrix} \right)\)}.
$$

This means that if a function $f$ is a solution to the PDE then it is constant in the
direction $\left( \begin{smallmatrix}
            3 \\ 2
        \end{smallmatrix} \right)$. This means that all solutions have
the form $f(x,y) = g(2x-3y)$ for some $g:\bR \to \bR$.

The same idea as used for the above example gives the following general
result.
Let $g:\bR\to\bR$ be differentiable, $a,b\in \bR$, $(a,b)\neq (0,0)$. If
$f(x,y)= g(bx-ay)$ then
$$a \tfrac{\partial f}{\partial x} (x,y) + b \tfrac{\partial f}{\partial y} (x,y) = 0.$$
Conversely, every $f$ which satisfies this equation is of the form
$g(bx-ay)$.

First we prove **($\Rightarrow$)**. If $f(x,y)= g(bx-ay)$
then, by the chain rule,

$$
\partial_x f(x,y) = bg'(bx-ay), \quad \partial_y f(x,y) = -ag'(bx-ay).
$$

Consequently
$$a\partial_x f(x,y) + b \partial_y f(x,y) = a bg'(bx-ay) - abg'(bx-ay) = 0.$$
Now we prove **($\Leftarrow$)**. It's convenient to work in
coordinates which correspond to the lines along which the solutions are
constant. Let

$$
\left(\begin{smallmatrix}
            u\\ v
        \end{smallmatrix}\right)
    = \left(\begin{smallmatrix}
            a & b \\ b & -a
        \end{smallmatrix}\right)
    \left(\begin{smallmatrix}
            x \\ y
        \end{smallmatrix}\right).
$$

This means that
$\left(\begin{smallmatrix}
            x\\ y
        \end{smallmatrix}\right)
    = \frac{-1}{a^2 + b^2} \left(\begin{smallmatrix}
            a & b \\ b & -a
        \end{smallmatrix}\right)
    \left(\begin{smallmatrix}
            u \\ v
        \end{smallmatrix}\right)$.
Let

$$
h(u,v)=f\left(\frac{au + bv}{a^2 + b^2}, \frac{bu-av}{a^2+b^2}\right).
$$

We
calculate that

$$
\partial_u h(u,v)
        = \tfrac{1}{{a^2 + b^2}}
        \left( a \partial_x f
        + b \partial_y f \right)  (au + bv, bu-av) = 0.
$$

Namely,
$h(u,v)$ is a function of $v$ only and does not depend on $u$ so we take $g(v) = h(u,v)$ and so $f(x,y) = g(bx-ay)$.

Now we look at another type of PDE. The [1D wave equation](https://en.wikipedia.org/wiki/Wave_equation) is

$$
\frac{\partial^2 f}{\partial x^2}(x,t) = c^2  \frac{\partial^2 f}{\partial t^2}(x,t).
$$

Here $x$ represents the position along string, $t$ is time and $f(x,t)$ is the displacement of the string from the centre at position $x$, at time $t$. The constant $c$ is a fixed parameter depending on the string.

This partial differential equation is derived from the equation of motion $F = m a$ where $F$ is the tension in the string, $a$ is the acceleration from horizontal and $m$ is the mass of a little piece of the string. The equation is valid for small displacement. In this case the _boundary conditions_ are natural: Are the ends of the string fixed? Is only one end fixed? At time $t=0$, is the string already moving?

::: tip Theorem
Let $F$ be a twice differentiable function and $G$ a differentiable function.
The function defined as

$$
f(x,t) = \frac{1}{2}(F(x+ct) + F(x-ct)) + \frac{1}{2c} \int_{x-ct}^{x+ct} G(s) \ ds
$$

satisfies
$\frac{\partial^2 f}{\partial x^2}(x,t) = c^2  \frac{\partial^2 f}{\partial t^2}(x,t)$,
$f(x,0) = F(x)$ and $\frac{\partial f}{\partial t}(x,0) = G(x)$.

Conversely, if a solution of
$$\frac{\partial^2 f}{\partial x^2}(x,t) = c^2  \frac{\partial^2 f}{\partial t^2}(x,t)$$
satisfies
$\frac{\partial^2 f}{\partial x \partial t} = \frac{\partial^2 f}{\partial t \partial x}$,
then it has the above
form.

:::

Let $f(x,t)$ be as defined in the statement of the theorem. We calculate the
partial derivatives

$$
\begin{aligned}
    \tfrac{\partial f}{\partial x} (x,t)
        & = \tfrac{1}{2} \left(F'(x+ct) + F'(x-ct)\right)          \\
        & \quad\quad\quad
    + \tfrac{1}{2c}\left(G(x+ct) - G(x-ct)\right)               \\
    \tfrac{\partial^2 f}{\partial x^2}(x,t)
        & = \tfrac{1}{2} \left(F''(x+ct) + F''(x-ct)\right)        \\
        & \quad\quad\quad
    + \tfrac{1}{2c}\left(G'(x+ct) - G'(x-ct)\right)             \\
    \tfrac{\partial f}{\partial t} (x,t)
        & = \tfrac{1}{2} \left(cF'(x+ct) - c F'(x-ct)\right)       \\
        & \quad\quad\quad
    + \tfrac{1}{2}\left(G(x+ct) + G(x-ct)\right)                \\
    \tfrac{\partial^2 f}{\partial t^2} f(x,t)
        & = \tfrac{1}{2} \left(c^2F''(x+ct) + c^2 F''(x-ct)\right) \\
        & \quad\quad\quad
    + \tfrac{c}{2}\left(G'(x+ct) + G'(x-ct)\right).
    \end{aligned}
$$

From this calculation we see that
$\frac{\partial^2 f}{\partial x^2}(x,t) = c^2  \frac{\partial^2 f}{\partial t^2}(x,t)$.
Additionally we have $f(x,0) = F(x)$ and
$\frac{\partial f}{\partial t}(x,0) = G(x)$.

Suppose that $f$ satisfies the 1D wave equation; Introduce $u = x + ct$,
$v=x-ct$ and observe that $x = \frac{u+v}{2}$, $t=\frac{u-v}{2c}$.
Define $g(u,v) = f(   \frac{u+v}{2} , \frac{u-v}{2c} )$.
By the chain
rule

$$
\begin{aligned}
    \tfrac{\partial g}{\partial u}(u,v)
        & = \tfrac{1}{2} \tfrac{\partial f}{\partial x}(   \tfrac{u+v}{2} , \tfrac{u-v}{2c} )
    + \tfrac{1}{2c} \tfrac{\partial f}{\partial t}(   \tfrac{u+v}{2} , \tfrac{u-v}{2c} ),                     \\
    \tfrac{\partial^2 g}{\partial v \partial u}(u,v)
        & = \tfrac{1}{4} \tfrac{\partial^2 f}{\partial x^2}(   \tfrac{u+v}{2} , \tfrac{u-v}{2c} )
    - \tfrac{1}{4c} \tfrac{\partial^2 f}{\partial x\partial t}(   \tfrac{u+v}{2} , \tfrac{u-v}{2c} )          \\
        & \ \ +  \tfrac{1}{4c} \tfrac{\partial^2 f}{\partial x \partial t}(   \tfrac{u+v}{2} , \tfrac{u-v}{2c} )
    -  \tfrac{1}{4c^2} \tfrac{\partial^2 f}{\partial t^2}(   \tfrac{u+v}{2} , \tfrac{u-v}{2c} ) = 0.
\end{aligned}
$$

Since the second derivative is zero we know that $\tfrac{\partial g}{\partial u}$ is constant in $v$, therefore we can
write $\tfrac{\partial g}{\partial u}(u,v) = \varphi_0(u)$. In turn this means we can write $g(u,v) = \varphi_1(u) + \varphi_2(v)$. I.e., $f(x,t) = \varphi_1(x+ct) + \varphi_2(x-ct)$. Let

$$
F(x) = \varphi_1(x) + \varphi_2(x).
$$

This means that $F'(x) = \varphi_1'(x) + \varphi_2'(x)$ and
$\frac{\partial f}{\partial t}(x,t) = c\varphi_1(x+ct) - c\varphi_2(x-ct)$.
Let

$$
G(x) = \tfrac{\partial f}{\partial t}(x,0) = c\varphi_1(x) - c\varphi_2(x).
$$

Substituting these quantities we show that the required
form is satisfied.
